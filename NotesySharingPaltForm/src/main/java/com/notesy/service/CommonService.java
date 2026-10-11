package com.notesy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notesy.model.Contact;
import com.notesy.model.Feedback;
import com.notesy.repository.CommonRepository;
import com.notesy.repository.ContactRepository;

@Service
public class CommonService {
	private ContactRepository contactRepository;
	@Autowired
	private CommonRepository commonRepository;

	// view feedback

	public List<Feedback> fetchFeedback() {

		return commonRepository.fetchFeedback();

	}

	public String addContact(Contact contact) {

		contactRepository.save(contact);

		return "Contact Add sucessFully";

	}

	public CommonService(ContactRepository contactRepository) {
		super();
		this.contactRepository = contactRepository;
	}

}
