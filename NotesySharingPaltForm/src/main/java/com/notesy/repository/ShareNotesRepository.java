package com.notesy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notesy.model.ShareNotes;

public interface ShareNotesRepository extends JpaRepository<ShareNotes, Integer> {
	
	
	public List<ShareNotes> findByreceiverEmail(String email);

}
