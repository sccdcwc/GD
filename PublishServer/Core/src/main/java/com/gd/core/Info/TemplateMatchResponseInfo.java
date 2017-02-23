package com.gd.core.Info;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by wim on 2016/4/6.
 */
@XmlRootElement
public class TemplateMatchResponseInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private MetaInfo meta;
    private TMachDataInfo data;


    public TemplateMatchResponseInfo() {
    }

    public TemplateMatchResponseInfo(MetaInfo meta, TMachDataInfo data) {
        this.meta = meta;
        this.data = data;
    }

    public static class TMachDataInfo implements Serializable {
        private static final long serialVersionUID = 1L;
        private List<TemplateMatchInfo> templateMatchList;

        public TMachDataInfo() {
        }

        public TMachDataInfo(List<TemplateMatchInfo> templateMatchList) {
            this.templateMatchList = templateMatchList;
        }

        @XmlElement
        public List<TemplateMatchInfo> getTemplateMatchList() {
            return templateMatchList;
        }

        public void setTemplateMatchList(List<TemplateMatchInfo> templateMatchList) {
            this.templateMatchList = templateMatchList;
        }
    }

    @XmlElement
    public MetaInfo getMeta() {
        return meta;
    }

    public void setMeta(MetaInfo meta) {
        this.meta = meta;
    }

    @XmlElement
    public TMachDataInfo getData() {
        return data;
    }

    public void setData(TMachDataInfo data) {
        this.data = data;
    }
}
