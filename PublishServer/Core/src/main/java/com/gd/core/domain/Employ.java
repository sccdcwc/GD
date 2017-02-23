package com.gd.core.domain;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Employ entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "employ", catalog = "publish")
public class Employ implements java.io.Serializable {

	// Fields

	private Integer employId;
	private Instance instance;
	private Integer groupId;
	private String users;
	private String groupName;
	private Short groupType;
	private String groupPriority;
	private Timestamp time;

	// Constructors

	/** default constructor */
	public Employ() {
	}

	/** minimal constructor */
	public Employ(Instance instance, Timestamp time) {
		this.instance = instance;
		this.time = time;
	}

	/** full constructor */
	public Employ(Instance instance, Integer groupId, String users,
			String groupName, Short groupType, String groupPriority,
			Timestamp time) {
		this.instance = instance;
		this.groupId = groupId;
		this.users = users;
		this.groupName = groupName;
		this.groupType = groupType;
		this.groupPriority = groupPriority;
		this.time = time;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "employ_id", unique = true, nullable = false)
	public Integer getEmployId() {
		return this.employId;
	}

	public void setEmployId(Integer employId) {
		this.employId = employId;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "instance_id", nullable = false)
	public Instance getInstance() {
		return this.instance;
	}

	public void setInstance(Instance instance) {
		this.instance = instance;
	}

	@Column(name = "group_id")
	public Integer getGroupId() {
		return this.groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	@Column(name = "users", length = 100)
	public String getUsers() {
		return this.users;
	}

	public void setUsers(String users) {
		this.users = users;
	}

	@Column(name = "group_name", length = 30)
	public String getGroupName() {
		return this.groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	@Column(name = "group_type")
	public Short getGroupType() {
		return this.groupType;
	}

	public void setGroupType(Short groupType) {
		this.groupType = groupType;
	}

	@Column(name = "group_priority", length = 30)
	public String getGroupPriority() {
		return this.groupPriority;
	}

	public void setGroupPriority(String groupPriority) {
		this.groupPriority = groupPriority;
	}

	@Column(name = "time", nullable = false, length = 19)
	public Timestamp getTime() {
		return this.time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}

}