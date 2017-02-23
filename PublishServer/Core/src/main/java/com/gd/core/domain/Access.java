package com.gd.core.domain;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Access entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "access", catalog = "publish")
public class Access implements java.io.Serializable {

	// Fields

	private Integer accessId;
	private Integer userId;
	private String userName;
	private String region;
	private String authority;
	private Timestamp visitTime;

	// Constructors

	/** default constructor */
	public Access() {
	}

	/** minimal constructor */
	public Access(Integer userId, String region, Timestamp visitTime) {
		this.userId = userId;
		this.region = region;
		this.visitTime = visitTime;
	}

	/** full constructor */
	public Access(Integer userId, String userName, String region,
			String authority, Timestamp visitTime) {
		this.userId = userId;
		this.userName = userName;
		this.region = region;
		this.authority = authority;
		this.visitTime = visitTime;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "access_id", unique = true, nullable = false)
	public Integer getAccessId() {
		return this.accessId;
	}

	public void setAccessId(Integer accessId) {
		this.accessId = accessId;
	}

	@Column(name = "user_id", nullable = false)
	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Column(name = "user_name", length = 30)
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "region", nullable = false, length = 20)
	public String getRegion() {
		return this.region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	@Column(name = "authority", length = 10)
	public String getAuthority() {
		return this.authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	@Column(name = "visit_time", nullable = false, length = 19)
	public Timestamp getVisitTime() {
		return this.visitTime;
	}

	public void setVisitTime(Timestamp visitTime) {
		this.visitTime = visitTime;
	}

}