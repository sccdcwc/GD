package com.gd.core.domain;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Instance entity. @author MyEclipse Persistence Tools
 */
@Entity
@XmlRootElement
@Table(name = "instance", catalog = "publish")
public class Instance implements java.io.Serializable {

	// Fields

	private Integer instanceId;
	private String name;
	private Short status;
	private Integer templateId;
	private Integer createrId;
	private String createrName;
	private Timestamp creatTime;
	private String region;
	private String scale;
	private String temporaryData;
	private String previewData;
	private String publishData;
	private Timestamp updateTime;
	private Timestamp auditTime;
	private Timestamp publishTime;
	private Timestamp publishSuccessTime;
	private Set<Employ> emploies = new HashSet<Employ>(0);

	// Constructors

	/** default constructor */
	public Instance() {
	}

	/** minimal constructor */
	public Instance(Integer createrId, Timestamp creatTime,
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
	public Instance(String name, Short status, Integer templateId,
			Integer createrId, String createrName, Timestamp creatTime,
			String region, String scale, String temporaryData,
			String previewData, String publishData, Timestamp updateTime,
			Timestamp auditTime, Timestamp publishTime,
			Timestamp publishSuccessTime, Set<Employ> emploies) {
		this.name = name;
		this.status = status;
		this.templateId = templateId;
		this.createrId = createrId;
		this.createrName = createrName;
		this.creatTime = creatTime;
		this.region = region;
		this.scale = scale;
		this.temporaryData = temporaryData;
		this.previewData = previewData;
		this.publishData = publishData;
		this.updateTime = updateTime;
		this.auditTime = auditTime;
		this.publishTime = publishTime;
		this.publishSuccessTime = publishSuccessTime;
		this.emploies = emploies;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "instance_id", unique = true, nullable = false)
	public Integer getInstanceId() {
		return this.instanceId;
	}

	public void setInstanceId(Integer instanceId) {
		this.instanceId = instanceId;
	}

	@Column(name = "name", length = 50, unique = true, nullable = false)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "status")
	public Short getStatus() {
		return this.status;
	}

	public void setStatus(Short status) {
		this.status = status;
	}

	@Column(name = "template_id")
	public Integer getTemplateId() {
		return this.templateId;
	}

	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}

	@Column(name = "creater_id", nullable = false)
	public Integer getCreaterId() {
		return this.createrId;
	}

	public void setCreaterId(Integer createrId) {
		this.createrId = createrId;
	}

	@Column(name = "creater_name", length = 30)
	public String getCreaterName() {
		return this.createrName;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	@Column(name = "creat_time", nullable = false, length = 19)
	public Timestamp getCreatTime() {
		return this.creatTime;
	}

	public void setCreatTime(Timestamp creatTime) {
		this.creatTime = creatTime;
	}

	@Column(name = "region", length = 20)
	public String getRegion() {
		return this.region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	@Column(name = "scale", length = 5)
	public String getScale() {
		return this.scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	@Column(name = "temporary_data", length = 100)
	public String getTemporaryData() {
		return this.temporaryData;
	}

	public void setTemporaryData(String temporaryData) {
		this.temporaryData = temporaryData;
	}

	@Column(name = "preview_data", length = 100)
	public String getPreviewData() {
		return this.previewData;
	}

	public void setPreviewData(String previewData) {
		this.previewData = previewData;
	}

	@Column(name = "publish_data", length = 100)
	public String getPublishData() {
		return this.publishData;
	}

	public void setPublishData(String publishData) {
		this.publishData = publishData;
	}

	@Column(name = "update_time", nullable = false, length = 19)
	public Timestamp getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}

	@Column(name = "audit_time", nullable = false, length = 19)
	public Timestamp getAuditTime() {
		return this.auditTime;
	}

	public void setAuditTime(Timestamp auditTime) {
		this.auditTime = auditTime;
	}

	@Column(name = "publish_time", nullable = false, length = 19)
	public Timestamp getPublishTime() {
		return this.publishTime;
	}

	public void setPublishTime(Timestamp publishTime) {
		this.publishTime = publishTime;
	}

	@Column(name = "publish_success_time", nullable = false, length = 19)
	public Timestamp getPublishSuccessTime() {
		return this.publishSuccessTime;
	}

	public void setPublishSuccessTime(Timestamp publishSuccessTime) {
		this.publishSuccessTime = publishSuccessTime;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "instance")
	public Set<Employ> getEmploies() {
		return this.emploies;
	}

	public void setEmploies(Set<Employ> emploies) {
		this.emploies = emploies;
	}

}