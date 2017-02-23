package com.gd.station.resource;

import com.gd.core.Info.*;
import com.gd.core.constant.PublishApi;
import com.gd.core.domain.Template;
import com.gd.core.util.FileCustomUtil;
import com.gd.core.util.ImageCustomUtil;
import com.gd.core.util.JsonUtil;
import com.gd.station.service.TemplateService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.PathSegment;
import javax.xml.bind.JAXBContext;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by wim on 2016/3/31.
 */
@Component
@Path(PublishApi.TEMPLATE_PATH)
public class TemplateResource {
    private final Logger log = LogManager.getLogger(TemplateResource.class.getName());
    @Autowired
    TemplateService templateService;

    public TemplateResource() {
    }

    @POST
    @Path("original")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createTemplateOriginal(@FormParam("templateName") final String templateName,
                                          @FormParam("scale") final String scale,
                                          @FormParam("temporaryData") final String temporaryData,
                                          @FormParam("createrName") final String createrName,
                                          @FormParam("createrId") final Integer createrId,
                                          @FormParam("previewData") final List<String> previewData,
                                          @Context ServletContext servletContext){
        System.out.println(templateName);
        String realPath = servletContext.getRealPath("/");
        String previewPath = PublishApi.TEMPLATE_PREVIEW_IMAGE_PATH + templateName;
        FileCustomUtil.isDirExist(realPath + previewPath);
        FileCustomUtil.isDirExist(realPath + PublishApi.TEMPLATE_TEMPORARY_DATA_PATH);
//        File previewFile = new File(servletContext.getRealPath("/") + previewPath);
        String temporaryPath = PublishApi.TEMPLATE_TEMPORARY_DATA_PATH;
//        System.out.println(previewPath+"--------------");
        try {
//            FileUtils.copyInputStreamToFile(inputStream, previewFile);
            for(String data : previewData){
                System.out.println("data:  "+data);
                String name = data.substring(0, 5).split(",")[0];
                String path = realPath + previewPath+File.separator+name+".jpg";
                ImageCustomUtil.base64StringToImage(data.substring(23+name.length(), data.length()), path);
            }
            FileCustomUtil.writerText(new File(realPath + temporaryPath+templateName), temporaryData);
            Template template = new Template();
            template.setName(templateName);
            template.setStatus(Short.parseShort("0"));
            template.setScale(scale);
            template.setCreaterId(createrId);
            template.setCreaterName(createrName);
            template.setPreviewData(previewPath);
            template.setTemporaryData(temporaryPath + templateName);
            template = templateService.createTemplate(template);
            TemplateOriginalResponseInfo info = new TemplateOriginalResponseInfo();
            info.setMeta(new MetaInfo(MetaCode.CREATE_SUCCESS, MetaCode.CREATE_SUCCESS_INFO));
            info.setData(new TemplateOriginalResponseInfo.TOriginalDataInfo(template.getTemplateId()));
            JAXBContext jc = JAXBContext.newInstance(TemplateOriginalResponseInfo.class, TemplateOriginalResponseInfo.TOriginalDataInfo.class);
            return JsonUtil.toJson(info, jc);
        }catch (Exception e){
            e.printStackTrace();
            log.error(e);
            return "{\"code\":"+MetaCode.CREATE_ERROR+",\"content\":\""+MetaCode.CREATE_ERROR_INFO+"\"}";
        }
    }

    @POST
    @Path("replica")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String createTemplateReplica(final TemplateReplicaRequestInfo templateInfo,
                                        @Context ServletContext servletContext){
        System.out.println(templateInfo.getTemplateId());
        String realPath = servletContext.getRealPath("/");
        try {
            Template originalTemplate = templateService.getTemplateById(templateInfo.getTemplateId());
            String time = new SimpleDateFormat("yyyyMMddHHmm").format(new Date());
            String previewPath = originalTemplate.getPreviewData()+"_copy_"+time;
            System.out.println("previewPath-------------"+previewPath);
            FileCustomUtil.isDirExist(realPath + previewPath);
            File[] imageFiles = new File(realPath + originalTemplate.getPreviewData()).listFiles();
            String temporaryPath = originalTemplate.getTemporaryData() + "_copy_"+time;
            if(imageFiles!=null){
                for(File imageFile : imageFiles){
                    if(imageFile.isFile()){
                        FileCustomUtil.copyFile(imageFile, new File(realPath + previewPath + File.separator + imageFile.getName()));
                    }
                }
            }
            FileCustomUtil.copyFile(new File(realPath + originalTemplate.getTemporaryData()), new File(realPath + temporaryPath));
            Template copyTemplate = new Template();
            copyTemplate.setName(originalTemplate.getName()+"_copy_"+time);
            copyTemplate.setStatus(Short.decode("0"));
            copyTemplate.setScale(originalTemplate.getScale());
            copyTemplate.setPreviewData(previewPath);
            copyTemplate.setCreaterId(templateInfo.getCreaterId());
            copyTemplate.setCreaterName(templateInfo.getCreaterName());
            copyTemplate.setTemporaryData(temporaryPath);
            copyTemplate = templateService.createTemplate(copyTemplate);
            TemplateReplicaResponseInfo info = new TemplateReplicaResponseInfo();
            info.setMeta(new MetaInfo(MetaCode.CREATE_SUCCESS, MetaCode.CREATE_SUCCESS_INFO));
            info.setData(new TemplateReplicaResponseInfo.TRepliacteDataInfo(copyTemplate.getTemplateId(), copyTemplate.getScale(), copyTemplate.getTemporaryData()));
            JAXBContext jc = JAXBContext.newInstance(TemplateReplicaResponseInfo.class, TemplateReplicaResponseInfo.TRepliacteDataInfo.class);
            return JsonUtil.toJson(info, jc);
        }catch (Exception e){
            log.error(e);
            return "{\"code\":"+MetaCode.CREATE_ERROR+",\"content\":\""+MetaCode.CREATE_ERROR_INFO+"\"}";
        }
    }

    @PUT
    @Path("{templateId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public MetaInfo updateTemplates(@PathParam("templateId") final Integer templateId,
                                    @FormParam("templateName") final String templateName,
                                    @FormParam("status") final Short status,
                                    @FormParam("temporaryData") final String temporaryData,
                                    @FormParam("previewData") final List<String> previewData,
                                    @Context ServletContext servletContext){
        System.out.println(templateId);
        String realPath = servletContext.getRealPath("/");
        try {
            Template template = templateService.getTemplateById(templateId);
            File previewFile = null;
            File temporaryFile = null;
            if(template.getName().compareTo(templateName)!=0){
                previewFile = FileCustomUtil.renameFile(new File(realPath+template.getPreviewData()), templateName);
                temporaryFile = FileCustomUtil.renameFile(new File(realPath+template.getTemporaryData()), templateName);
            }
            if(previewFile!=null){
                for(String data : previewData){
                    System.out.println("data:  "+data);
                    String name = data.substring(0, 5).split(",")[0];
                    String path = previewFile.getPath()+File.separator+name+".jpg";
                    ImageCustomUtil.base64StringToImage(data.substring(23+name.length(), data.length()), path);
                }
            }
            System.out.println("temporaryFile----------"+temporaryFile);
            FileCustomUtil.writerText(temporaryFile, temporaryData);
            template.setName(templateName);
            template.setStatus(status);
            template.setPreviewData(PublishApi.TEMPLATE_PREVIEW_IMAGE_PATH + templateName);
            template.setTemporaryData(PublishApi.TEMPLATE_TEMPORARY_DATA_PATH + templateName);
            templateService.updateTemplate(template);
            return new MetaInfo(MetaCode.UPDATE_SUCCESS, MetaCode.UPDATE_SUCCESS_INFO);
        }catch (Exception e){
            e.printStackTrace();
            log.error(e);
            return new MetaInfo(MetaCode.UPDATE_ERROR, MetaCode.UPDATE_ERROR_INFO);
        }
    }

    @GET
    @Path("data/{templateId}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getTemplateEditData(@PathParam("templateId") final Integer templateId) {
        try {
            Template template = templateService.getTemplateById(templateId);
            TemplateEditResponseInfo info = new TemplateEditResponseInfo();
            info.setMeta(new MetaInfo(MetaCode.FIND_SUCCESS, MetaCode.FIND_SUCCESS_INFO));
            info.setData(new TemplateEditResponseInfo.TEditDataInfo(template.getTemporaryData()));
            JAXBContext jc = JAXBContext.newInstance(TemplateEditResponseInfo.class, TemplateEditResponseInfo.TEditDataInfo.class);
            return JsonUtil.toJson(info, jc);
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e);
            return "{\"code\":" + MetaCode.FIND_ERROR + ",\"content\":\"" + MetaCode.FIND_ERROR_INFO + "\"}";
        }
    }

    @GET
    @Path("{condition}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getTemplateMatch(@PathParam("condition") final PathSegment condition,
                                                      @MatrixParam("status") final Short status){
        try {
            final MultivaluedMap<String, String> matrixParameters = condition.getMatrixParameters();
            final Iterator<Map.Entry<String, List<String>>> iterator = matrixParameters.entrySet().iterator();
            TemplateQueryInfo templateInfo = new TemplateQueryInfo();
            while(iterator.hasNext()){
                final Map.Entry<String, List<String>> entry = iterator.next();
                if(entry.getKey().compareTo("createrName")==0){
                    templateInfo.setCreaterName(entry.getValue().get(0));
                }else if(entry.getKey().compareTo("templateName")==0){
                    templateInfo.setTemplateName(entry.getValue().get(0));
                }else if(entry.getKey().compareTo("scale")==0){
                    templateInfo.setScale(entry.getValue().get(0));
                }else if(entry.getKey().compareTo("creatDate")==0){
                    templateInfo.setCreatTime(entry.getValue().get(0));
                }else if(entry.getKey().compareTo("updateDate")==0){
                    templateInfo.setUpdateTime(entry.getValue().get(0));
                }else if(entry.getKey().compareTo("publishDate")==0){
                    templateInfo.setPublishTime(entry.getValue().get(0));
                }
            }
            templateInfo.setStatus(status);
            System.out.println(templateInfo.toString());
            List<TemplateMatchInfo> matchInfo = templateService.getTemplates(templateInfo);
            if(matchInfo==null){
                return "{\"code\":"+MetaCode.FIND_PARAMETER_ERROR+",\"content\":\""+MetaCode.FIND_PARAMETER_ERROR_INFO+"\"}";
            }else{
                TemplateMatchResponseInfo info = new TemplateMatchResponseInfo();
                info.setMeta(new MetaInfo(MetaCode.FIND_SUCCESS, MetaCode.FIND_SUCCESS_INFO));
                info.setData(new TemplateMatchResponseInfo.TMachDataInfo(matchInfo));
                JAXBContext jc = JAXBContext.newInstance(TemplateMatchResponseInfo.class, TemplateMatchResponseInfo.TMachDataInfo.class);
                return JsonUtil.toJson(info, jc);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error(e);
            return "{\"code\":"+MetaCode.FIND_ERROR+",\"content\":\""+MetaCode.FIND_ERROR_INFO+"\"}";
        }

    }

    @GET
    @Path("info/{templateId}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getTemplateDetail(@PathParam("templateId") final  Integer templateId,
                                    @Context ServletContext servletContext){
        String realPath = servletContext.getRealPath("/");
        String resPath = PublishApi.PROTOCOL+PublishApi.SERVICE_IP+PublishApi.SERVICE_PORT+PublishApi.STATION_PATH;
        try {
            Template template = templateService.getTemplateById(templateId);
            File[] imageFiles = new File(realPath + template.getPreviewData()).listFiles();
            ArrayList<String> images = new ArrayList<>();
            if(imageFiles!=null){
                for(File image : imageFiles){
                    images.add(resPath + template.getPreviewData() + File.separator + image.getName());
                }
            }
            TemplateViewResponseInfo info = new TemplateViewResponseInfo();
            info.setMeta(new MetaInfo(MetaCode.FIND_SUCCESS, MetaCode.FIND_SUCCESS_INFO));
            info.setData(new TemplateViewResponseInfo.TViewDataInfo(template.getCreaterName(), template.getName(), template.getStatus(), template.getScale(), template.getCreatTime().toString(), template.getUpdateTime().toString(), template.getPublishTime().toString(), images));
            JAXBContext jc = JAXBContext.newInstance(TemplateViewResponseInfo.class, TemplateViewResponseInfo.TViewDataInfo.class);
            return JsonUtil.toJson(info, jc);
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e);
            return "{\"code\":" + MetaCode.FIND_ERROR + ",\"content\":\"" + MetaCode.FIND_ERROR_INFO + "\"}";
        }
    }

    @DELETE
    @Path("{templateId}")
    @Produces(MediaType.APPLICATION_JSON)
    public MetaInfo deleteTemplate(@PathParam("templateId") final  Integer templateId){
        try {
            templateService.deleteTemplate(templateId);
            return new MetaInfo(MetaCode.DELETE_SUCCESS, MetaCode.DELETE_SUCCESS_INFO);
        }catch (Exception e){
            e.printStackTrace();
            log.error(e);
            return new MetaInfo(MetaCode.DELETE_EEROR, MetaCode.DELETE_EEROR_INFO);
        }
    }

//    @GET
//    @Path("{templateName}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Template getTemplates(@PathParam("templateName") final String templateName){
//        System.out.println("getTemplates-------------------");
//        try {
//            ImageCustomUtil.base64StringToImage(data, previewPath+File.separator+"1.jpg");
//            ImageCustomUtil.base64StringToImage(data2, previewPath+File.separator+"2.jpg");
//            System.out.println(ImageCustomUtil.GenerateImage(data, previewPath+File.separator+"2.jpg"));
//            JAXBContext jc = JAXBContext.newInstance(TemplateReplicaRequestInfo.class);
//            TemplateReplicaRequestInfo info = new TemplateReplicaRequestInfo(3, 3, "333");
//            System.out.println(JsonUtil.toJson(info, jc));
//            Template template = templateService.getTemplateByName(templateName);
//            System.out.println(template.getCreaterName());
//            return template;
//        }catch (final Exception e){
//            return null;
//        }
//    }
}
