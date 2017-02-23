package com.gd.core.Info;

import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by wim on 2016/4/6.
 */
public class TemplateMatchInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer templateId;
    private String createrName;
    private String templateName;
    private Short status;
    private String scale;
    private Timestamp creatTime;
    private Timestamp updateTime;
    private Timestamp publishTime;

    public TemplateMatchInfo() {
    }

    public TemplateMatchInfo(Integer templateId, String createrName, String templateName, Short status, String scale, Timestamp creatTime, Timestamp updateTime, Timestamp publishTime) {
        this.templateId = templateId;
        this.createrName = createrName;
        this.templateName = templateName;
        this.status = status;
        this.scale = scale;
        this.creatTime = creatTime;
        this.updateTime = updateTime;
        this.publishTime = publishTime;
    }

    @XmlElement
    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
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
    public Timestamp getCreatTime() {
        return creatTime;
    }

    public void setCreatTime(Timestamp creatTime) {
        this.creatTime = creatTime;
    }

    @XmlElement
    public Timestamp getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    @XmlElement
    public Timestamp getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(Timestamp publishTime) {
        this.publishTime = publishTime;
    }

    @Override
    public String toString() {
        return "TemplateMatchInfo{" +
                "templateId=" + templateId +
                ", createrName='" + createrName + '\'' +
                ", templateName='" + templateName + '\'' +
                ", status=" + status +
                ", scale='" + scale + '\'' +
                ", creatTime=" + creatTime +
                ", updateTime=" + updateTime +
                ", publishTime=" + publishTime +
                '}';
    }
}
