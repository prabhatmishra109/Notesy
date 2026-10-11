package com.notesy.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.notesy.model.Contact;
import com.notesy.model.Feedback;
import com.notesy.service.CommonService;

@RestController
//@RequestMapping("/common")
//@CrossOrigin({"http://localhost:5173")
@CrossOrigin("*")
public class CommonController {

	// request and response are accepted and given by controller
	// waiter is just like controller
	private CommonService commonservice;

//	@Autowired
	public CommonController(CommonService commonservice) {
		super();
		this.commonservice = commonservice;
	}

	@PostMapping("/addContact")
	public String addContact(@RequestBody Contact contact) {

//		System.out.println("Name is "+contact.getName());
//		System.out.println("Email is "+contact.getEmail());
//		System.out.println("phone is "+contact.getPhone());
//		System.out.println("question is "+contact.getQuestion());

		return commonservice.addContact(contact);

//		return "Hello React";

	}

	// view all feedback
	@GetMapping("/fetchFeedback")
	public ResponseEntity<List<Feedback>> fetchFeedback() {

		List<Feedback> fList = commonservice.fetchFeedback();

		System.out.println(fList);

		return ResponseEntity.ok(fList);
	}
}
