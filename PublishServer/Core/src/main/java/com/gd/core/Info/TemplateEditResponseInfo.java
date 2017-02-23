package com.gd.core.Info;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * Created by wi on 2016/4/4.
 */
@XmlRootElement
public class TemplateEditResponseInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private MetaInfo meta;
    private TEditDataInfo data;

    public TemplateEditResponseInfo() {
    }

    public TemplateEditResponseInfo(MetaInfo meta, TEditDataInfo data) {
        this.meta = meta;
        this.data = data;
    }

    public static class TEditDataInfo implements Serializable{
        private static final long serialVersionUID = 1L;
        private String temporaryData;

        public TEditDataInfo() {
        }

        public TEditDataInfo(String temporaryData) {
            this.temporaryData = temporaryData;
        }

        @XmlElement
        public String getTemporaryData() {
            return temporaryData;
        }

        public void setTemporaryData(String temporaryData) {
            this.temporaryData = temporaryData;
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
    public TEditDataInfo getData() {
        return data;
    }

    public void setData(TEditDataInfo data) {
        this.data = data;
    }

}
