package com.gd.core.domain;

import com.gd.core.util.JaxbDateSerializer;
import org.hibernate.annotations.*;

import java.sql.Timestamp;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * Template entity. @author MyEclipse Persistence Tools
 */
@Entity
@XmlRootElement
@Table(name = "template", catalog = "publish")
@NamedQueries({@NamedQuery(name = "findByStatus", query = "SELECT template FROM Template template WHERE template.status= :status"),
		@NamedQuery(name = "findByName", query = "SELECT template FROM Template template WHERE template.name= :name"),
		@NamedQuery(name = "findByCriteria", query = "SELECT template FROM Template template WHERE template.name= :name AND " +
				"template.status = :status AND " +
				"template.createrName = :createrName AND " +
				"template.scale = :scale AND " +
				"substring(template.creatTime, 1, 10) = :creatTime AND " +
				"substring(template.updateTime, 1, 10) = :updateTime AND " +
				"substring(template.publishTime, 1, 10) = :publishTime")})
public class Template implements java.io.Serializable {

	// Fields
	private static final long serialVersionUID = 1L;
	private Integer templateId;
	private String name;
	private Short status;
	private Integer createrId;
	private String createrName;
	private Timestamp creatTime;
	private String scale;
	private String region;
	private String temporaryData;
	private String previewData;
	private Timestamp updateTime;
	private Timestamp auditTime;
	private Timestamp publishTime;
	private Timestamp publishSuccessTime;

	// Constructors

	/** default constructor */
	public Template() {
	}

	/** minimal constructor */
	public Template(Integer createrId, Timestamp creatTime,
			Timestamp updateTime, Timestamp auditTime, Timestamp publishTime,
			Timestamp publishSuccessTime) {
		this.createrId = createrId;
		this.creatTime = creatTime;
		this.updateTime = updateTime;
		this.auditTime = auditTime;
		this.publishTime = publishTime;
		this.publishSuccessTime = publishSuccessTime;
	}

	/** full constructor */
	public Template(String name, Short status, Integer createrId,
			String createrName, Timestamp creatTime, String scale,
			String region, String temporaryData, String previewData,
			Timestamp updateTime, Timestamp auditTime, Timestamp publishTime,
			Timestamp publishSuccessTime) {
		this.name = name;
		this.status = status;
		this.createrId = createrId;
		this.createrName = createrName;
		this.creatTime = creatTime;
		this.scale = scale;
		this.region = region;
		this.temporaryData = temporaryData;
		this.previewData = previewData;
		this.updateTime = updateTime;
		this.auditTime = auditTime;
		this.publishTime = publishTime;
		this.publishSuccessTime = publishSuccessTime;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "template_id", unique = true, nullable = false)
	@XmlAttribute
	public Integer getTemplateId() {
		return this.templateId;
	}

	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}

	@Column(name = "name", length = 50, unique = true, nullable = false)
	@XmlAttribute
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "status")
	@XmlAttribute
	public Short getStatus() {
		return this.status;
	}

	public void setStatus(Short status) {
		this.status = status;
	}

	@Column(name = "creater_id", nullable = false)
	@XmlAttribute
	public Integer getCreaterId() {
		return this.createrId;
	}

	public void setCreaterId(Integer createrId) {
		this.createrId = createrId;
	}

	@Column(name = "creater_name", length = 30)
	@XmlAttribute
	public String getCreaterName() {
		return this.createrName;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	@Column(name = "creat_time", nullable = false, length = 19)
	@XmlAttribute
	@XmlJavaTypeAdapter(JaxbDateSerializer.class)
	public Timestamp getCreatTime() {
		return this.creatTime;
	}

	public void setCreatTime(Timestamp creatTime) {
		this.creatTime = creatTime;
	}

	@Column(name = "scale", length = 5)
	@XmlAttribute
	public String getScale() {
		return this.scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	@Column(name = "region", length = 20)
	@XmlAttribute
	public String getRegion() {
		return this.region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	@Column(name = "temporary_data", length = 100)
	@XmlAttribute
	public String getTemporaryData() {
		return this.temporaryData;
	}

	public void setTemporaryData(String temporaryData) {
		this.temporaryData = temporaryData;
	}

	@Column(name = "preview_data", length = 100)
	@XmlAttribute
	public String getPreviewData() {
		return this.previewData;
	}

	public void setPreviewData(String previewData) {
		this.previewData = previewData;
	}

	@Column(name = "update_time", nullable = false, length = 19)
	@XmlAttribute
	@XmlJavaTypeAdapter(JaxbDateSerializer.class)
	public Timestamp getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}

	@Column(name = "audit_time", nullable = false, length = 19)
	@XmlAttribute
	@XmlJavaTypeAdapter(JaxbDateSerializer.class)
	public Timestamp getAuditTime() {
		return this.auditTime;
	}

	public void setAuditTime(Timestamp auditTime) {
		this.auditTime = auditTime;
	}

	@Column(name = "publish_time", nullable = false, length = 19)
	@XmlAttribute
	@XmlJavaTypeAdapter(JaxbDateSerializer.class)
	public Timestamp getPublishTime() {
		return this.publishTime;
	}

	public void setPublishTime(Timestamp publishTime) {
		this.publishTime = publishTime;
	}

	@Column(name = "publish_success_time", nullable = false, length = 19)
	@XmlAttribute
	@XmlJavaTypeAdapter(JaxbDateSerializer.class)
	public Timestamp getPublishSuccessTime() {
		return this.publishSuccessTime;
	}

	public void setPublishSuccessTime(Timestamp publishSuccessTime) {
		this.publishSuccessTime = publishSuccessTime;
	}

}