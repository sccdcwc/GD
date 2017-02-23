package com.gd.core.Info;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by wim on 2016/4/6.
 */
@XmlRootElement
public class TemplateQueryInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private String createrName;
    private String templateName;
    private Short status;
    private String scale;
    private String creatTime;
    private String updateTime;
    private String publishTime;

    public TemplateQueryInfo() {
    }

    public TemplateQueryInfo(String createrName, String templateName, Short status, String scale, String creatTime, String updateTime, String publishTime) {
        this.createrName = createrName;
        this.templateName = templateName;
        this.status = status;
        this.scale = scale;
        this.creatTime = creatTime;
        this.updateTime = updateTime;
        this.publishTime = publishTime;
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

    @Override
    public String toString() {
        return "TemplateQueryInfo{" +
                "createrName='" + createrName + '\'' +
                ", templateName='" + templateName + '\'' +
                ", status=" + status +
                ", scale='" + scale + '\'' +
                ", creatTime='" + creatTime + '\'' +
                ", updateTime='" + updateTime + '\'' +
                ", publishTime='" + publishTime + '\'' +
                '}';
    }
}
