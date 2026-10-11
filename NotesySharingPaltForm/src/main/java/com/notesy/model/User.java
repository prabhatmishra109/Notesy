package com.notesy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {

	private String profilePic;
	private String description;

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	@Id
	@Column(name = "email", length = 45, nullable = false, unique = true)
	private String email;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "password", length = 45, nullable = false)
	private String password;
	@Column(name = "city", length = 100, nullable = false)
	private String city;
	@Column(name = "phone", length = 10, nullable = false)
	private String phone;
	@Column(name = "name", length = 100, nullable = false)

	private String name;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(String email, String password, String name, String phone, String city) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;
		this.phone = phone;
		this.city = city;
	}

}
