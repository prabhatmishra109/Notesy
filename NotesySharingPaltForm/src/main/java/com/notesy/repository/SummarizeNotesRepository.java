package com.notesy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notesy.model.SummariseNotes;

public interface SummarizeNotesRepository extends JpaRepository<SummariseNotes, Integer> {
	
	public List<SummariseNotes>findByEmail(String email);

}
