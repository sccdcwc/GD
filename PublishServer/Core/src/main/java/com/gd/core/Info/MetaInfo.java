package com.gd.core.Info;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * ATUP Device Info
 *
 * @author feuyeux@gmail.com
 * @since 1.0
 * 09/09/2013
 */
@XmlRootElement
public class MetaInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer code;
    private String content;

    public MetaInfo() {
    }

    public MetaInfo(final Integer code, final String content) {
        this.code = code;
        this.content = content;
    }

    @XmlAttribute
    public String getContent() {
        return content;
    }

    public void setContent(final String content) {
        this.content = content;
    }

    @XmlAttribute
    public Integer getCode() {
        return code;
    }

    public void setCode(final Integer code) {
        this.code = code;
    }
}
