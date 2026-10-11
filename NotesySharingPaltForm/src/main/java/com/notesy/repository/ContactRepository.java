package com.notesy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notesy.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

}
