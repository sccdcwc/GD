package com.gd.core.Info;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * Created by wi on 2016/4/4.
 */
@XmlRootElement(name="TemplateReplica")
public class TemplateReplicaResponseInfo implements Serializable{
    private static final long serialVersionUID = 1L;
    @XmlElement(name="meta")
    private MetaInfo meta;
    @XmlElement(name="data")
    private TRepliacteDataInfo data;

    public TemplateReplicaResponseInfo() {
    }

    public TemplateReplicaResponseInfo(MetaInfo meta, TRepliacteDataInfo data) {
        this.meta = meta;
        this.data = data;
    }

    public static class TRepliacteDataInfo implements Serializable{
        private static final long serialVersionUID = 1L;
        @XmlElement(name="templateId")
        private Integer templateId;
        @XmlElement(name="scale")
        private String scale;
        @XmlElement(name="temporaryData")
        private String temporaryData;

        public TRepliacteDataInfo() {
        }

        public TRepliacteDataInfo(Integer templateId, String scale, String temporaryData) {
            this.templateId = templateId;
            this.scale = scale;
            this.temporaryData = temporaryData;
        }

//        public Integer getTemplateId() {
//            return templateId;
//        }

        public void setTemplateId(Integer templateId) {
            this.templateId = templateId;
        }

//        public String getScale() {
//            return scale;
//        }

        public void setScale(String scale) {
            this.scale = scale;
        }

//        public String getTemporaryData() {
//            return temporaryData;
//        }

        public void setTemporaryData(String temporaryData) {
            this.temporaryData = temporaryData;
        }
    }

//    public MetaInfo getMeta() {
//        return meta;
//    }

    public void setMeta(MetaInfo meta) {
        this.meta = meta;
    }

//    public TRepliacteDataInfo getData() {
//        return data;
//    }

    public void setData(TRepliacteDataInfo data) {
        this.data = data;
    }
}
