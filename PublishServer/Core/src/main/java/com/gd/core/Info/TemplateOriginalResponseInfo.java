package com.gd.core.Info;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * Created by wi on 2016/4/4.
 */
@XmlRootElement(name="TemplateOriginal")
public class TemplateOriginalResponseInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @XmlElement(name="meta")
    private MetaInfo meta;
    @XmlElement(name="data")
    private TOriginalDataInfo data;

    public TemplateOriginalResponseInfo() {
    }

    public TemplateOriginalResponseInfo(MetaInfo meta, TOriginalDataInfo data) {
        this.meta = meta;
        this.data = data;
    }

    public static class TOriginalDataInfo implements Serializable{
        private static final long serialVersionUID = 1L;
        @XmlElement(name="templateId")
        private Integer templateId;

        public TOriginalDataInfo() {
        }

        public TOriginalDataInfo(Integer templateId) {
            this.templateId = templateId;
        }

//        public Integer getTemplateId() {
//            return templateId;
//        }

        public void setTemplateId(Integer templateId) {
            this.templateId = templateId;
        }
    }

//    public MetaInfo getMeta() {
//        return meta;
//    }

    public void setMeta(MetaInfo meta) {
        this.meta = meta;
    }

//    public TOriginalDataInfo getData() {
//        return data;
//    }

    public void setData(TOriginalDataInfo data) {
        this.data = data;
    }

//    public void outString(){
//        System.out.println(meta.getCode()+": "+meta.getContent());
//        System.out.println(templateId);
//    }
}
