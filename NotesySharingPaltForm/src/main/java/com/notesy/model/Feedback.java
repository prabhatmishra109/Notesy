package com.notesy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;

@Entity

public class Feedback {
	@Transient
	User user;// user object will not store in feedback table

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Id

	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private int id;

	public int getId() {
		return id;
	}

	@Column(name = "email", length = 45, nullable = false)

	private String email;

	@Column(name = "review", length = 255, nullable = false)
	private String review;

	@Column(name = "rating", length = 5, nullable = false)

	private String rating;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public Feedback() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Feedback(String email, String review, String rating) {
		super();
		this.email = email;
		this.review = review;
		this.rating = rating;
	}

}
