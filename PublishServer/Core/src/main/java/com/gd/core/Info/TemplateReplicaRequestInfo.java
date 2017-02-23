package com.gd.core.Info;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * Created by wi on 2016/4/4.
 */
@XmlRootElement
public class TemplateReplicaRequestInfo implements Serializable {
    private static final long serialVersionUID = 1L;
//    @XmlElement(name="templateId")
    private Integer templateId;
//    @XmlElement(name="createrId")
    private Integer createrId;
//    @XmlElement(name="createrName")
    private String createrName;

    public TemplateReplicaRequestInfo() {
    }

    public TemplateReplicaRequestInfo(Integer templateId, Integer createrId, String createrName) {
        this.templateId = templateId;
        this.createrId = createrId;
        this.createrName = createrName;
    }

    @XmlElement
    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }

    @XmlElement
    public Integer getCreaterId() {
        return createrId;
    }

    public void setCreaterId(Integer createrId) {
        this.createrId = createrId;
    }

    @XmlElement
    public String getCreaterName() {
        return createrName;
    }

    public void setCreaterName(String createrName) {
        this.createrName = createrName;
    }
}
