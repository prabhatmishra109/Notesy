package com.notesy.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
@Entity
public class SummariseNotes {
	@Id

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String email;

	public String getEmail() {
		return email;
	}
	@CreationTimestamp
	private LocalDateTime date;



	public LocalDateTime getDate() {
		return date;
	}




	public void setDate(LocalDateTime date) {
		this.date = date;
	}




	public void setEmail(String email) {
		this.email = email;
	}

	private String title;
	@Lob
	@Column(columnDefinition = "LONGTEXT")
	private String summarizeNotes;


	public String getTitle() {
		return title;
	}
	
	
	

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSummarizeNotes() {
		return summarizeNotes;
	}

	public void setSummarizeNotes(String summarizeNotes) {
		this.summarizeNotes = summarizeNotes;
	}



	public int getId() {
		return id;
	}
}
