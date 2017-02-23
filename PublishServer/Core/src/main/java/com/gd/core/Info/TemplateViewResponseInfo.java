package com.gd.core.Info;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.List;

/**
 * Created by wi on 2016/4/4.
 */
@XmlRootElement
public class TemplateViewResponseInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private MetaInfo meta;
    private TViewDataInfo data;

    public TemplateViewResponseInfo() {
    }

    public TemplateViewResponseInfo(MetaInfo meta, TViewDataInfo data) {
        this.meta = meta;
        this.data = data;
    }

    public static class TViewDataInfo implements Serializable{
        private static final long serialVersionUID = 1L;
        private String createrName;
        private String templateName;
        private Short status;
        private String scale;
        private String creatTime;
        private String updateTime;
        private String publishTime;
        private List<String> previewData;

        public TViewDataInfo() {
        }

        public TViewDataInfo(String createrName, String templateName, Short status, String scale, String creatTime, String updateTime, String publishTime, List<String> previewData) {
            this.createrName = createrName;
            this.templateName = templateName;
            this.status = status;
            this.scale = scale;
            this.creatTime = creatTime;
            this.updateTime = updateTime;
            this.publishTime = publishTime;
            this.previewData = previewData;
        }

        @XmlElement
        public String getCreaterName() {
            return createrName;
        }

        public void setCreaterName(String createrName) {
            this.createrName = createrName;
        }

        @XmlElement
        public String getTemplateName() {
            return templateName;
        }

        public void setTemplateName(String templateName) {
            this.templateName = templateName;
        }

        @XmlElement
        public Short getStatus() {
            return status;
        }

        public void setStatus(Short status) {
            this.status = status;
        }

        @XmlElement
        public String getScale() {
            return scale;
        }

        public void setScale(String scale) {
            this.scale = scale;
        }

        @XmlElement
        public String getCreatTime() {
            return creatTime;
        }

        public void setCreatTime(String creatTime) {
            this.creatTime = creatTime;
        }

        @XmlElement
        public String getUpdateTime() {
            return updateTime;
        }

        public void setUpdateTime(String updateTime) {
            this.updateTime = updateTime;
        }

        @XmlElement
        public String getPublishTime() {
            return publishTime;
        }

        public void setPublishTime(String publishTime) {
            this.publishTime = publishTime;
        }

        @XmlElement
        public List<String> getPreviewData() {
            return previewData;
        }

        public void setPreviewData(List<String> previewData) {
            this.previewData = previewData;
        }
    }

    @XmlElement(name="meta")
    public MetaInfo getMeta() {
        return meta;
    }

    public void setMeta(MetaInfo meta) {
        this.meta = meta;
    }

    @XmlElement(name="data")
    public TViewDataInfo getData() {
        return data;
    }

    public void setData(TViewDataInfo data) {
        this.data = data;
    }

}
