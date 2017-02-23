package com.gd.station.service;

import com.gd.core.Info.TemplateMatchInfo;
import com.gd.core.Info.TemplateQueryInfo;
import com.gd.core.dao.TemplateDao;
import com.gd.core.domain.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wim on 2016/3/31.
 */
@Service
public class TemplateService {
    @Autowired
    TemplateDao dao;

    public boolean deleteTemplate(final Integer templateId){
        return dao.remove(templateId);
    }

    public Template createTemplate(final Template template){
        return dao.save(template);
    }

    public  Template updateTemplate(final Template template){
        return dao.update(template);
    }

    public List<TemplateMatchInfo> getTemplates(final TemplateQueryInfo queryInfo){
        List<Template> templates = dao.findByCriteria(queryInfo);
        if(templates!=null){
            List<TemplateMatchInfo> infoList = new ArrayList<>();
            for(Template template : templates){
                infoList.add(new TemplateMatchInfo(template.getTemplateId(), template.getCreaterName(), template.getName(), template.getStatus(), template.getScale(), template.getCreatTime(), template.getUpdateTime(), template.getPublishTime()));
            }
            for(TemplateMatchInfo info : infoList){
                System.out.println(info);
            }
            return infoList;
        }else{
            return  null;
        }
    }

    public Template getTemplateByName(final String templateName) {
        return dao.findByName(templateName);
    }

    public Template getTemplateById(final Integer templateId){
        return dao.findById(templateId);
    }
}
