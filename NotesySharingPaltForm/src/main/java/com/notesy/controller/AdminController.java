package com.notesy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.notesy.dto.AdminDTO;
import com.notesy.dto.PasswordDTO;
import com.notesy.model.Admin;
import com.notesy.model.Contact;
import com.notesy.model.Feedback;
import com.notesy.model.User;
import com.notesy.repository.UserRepository;
import com.notesy.service.AdminService;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class AdminController {

	private final UserRepository userRepository;

	private AdminService adminService;
	

	// api for image upload
	//? ld card character when we ar returning multiple datatype based on condition
	@PostMapping("/uploadPic")
	public ResponseEntity<?> uploadPic(@RequestPart("profileImageDetail") Admin admin,
			@RequestPart("imageFile") MultipartFile imageFile) {
		
		long maxSize=2*1024*1024;
		
		if(imageFile.getSize()>maxSize) {
			return ResponseEntity.badRequest().body("File size exceeds 2mb limits");
		}
			

		System.out.println(admin.getDescription());
		System.out.println(imageFile.getOriginalFilename());
		System.out.println(imageFile.getSize());

		Map<String, String> imageMap = adminService.uploadPic(admin, imageFile);
		return ResponseEntity.ok(imageMap);
	}

	// api for update Password

	@PatchMapping("/updatePassword/{email}")

	public String pdatePassword(@RequestBody PasswordDTO pd, @PathVariable String email) {

		String message = adminService.updatePassword(pd, email);

		return message;
	}

	// api for editProfile
	@PutMapping("/editProfile/{email}")
	public ResponseEntity<Admin> editProfile(@RequestBody Admin admin, @PathVariable String email) {
		Admin adminObj = adminService.editProfile(admin, email);
		if (adminObj != null) {
			return new ResponseEntity<Admin>(adminObj, HttpStatus.OK);
		} else {

			return new ResponseEntity<Admin>(HttpStatus.NOT_FOUND);
		}
	}

	@Autowired
	public AdminController(AdminService adminService, UserRepository userRepository) {
		this.adminService = adminService;
		this.userRepository = userRepository;
	}

	// api for all contacts

	@GetMapping("/allContacts")

	public ResponseEntity<List<Contact>> allContacts() {
		List<Contact> contactList = adminService.allContacts();
		if (contactList.size() > 0) {

			return ResponseEntity.ok(contactList);
		} else {
			return ResponseEntity.notFound().build();

		}
	}

//	api for delete contact
	@DeleteMapping("/deleteContact/{id}")
	public ResponseEntity<String> deleteContact(@PathVariable Integer id) {

		adminService.deleteContact(id);
		return new ResponseEntity<String>(HttpStatus.NO_CONTENT);

	}

	@GetMapping("/allFeedback")

	public ResponseEntity<List<Feedback>> allFeedback() {

		List<Feedback> feedbackList = adminService.allFeedback();

		if (feedbackList.size() > 0) {
			return ResponseEntity.ok(feedbackList);

		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/deleteFeedback/{id}")
	public ResponseEntity<String> deleteFeedback(@PathVariable Integer id) {

		adminService.deleteFeedback(id);
		return new ResponseEntity<String>(HttpStatus.NO_CONTENT);

	}


	@GetMapping("/alluser")

	public ResponseEntity<List<User>> allUser() {

		List<User> userList = adminService.allUser();

		if (userList.size() > 0) {
			return ResponseEntity.ok(userList);

		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/login")
	public String adminLogin(@RequestBody Admin admin) {

		return adminService.adminLogin(admin);

	}

	@GetMapping("/adminProfile/{email}")
	public ResponseEntity<AdminDTO> adminProfile(@PathVariable String email) {
		Admin admin = adminService.getProfile(email);
		AdminDTO dto = null;
		if (admin != null) {
//creating object of adminDto

			dto = new AdminDTO(admin.getName(), admin.getPhone());

			dto.setProfilePic(admin.getProfilePic());
			return ResponseEntity.ok(dto);
		} else {
			return new ResponseEntity<AdminDTO>(dto, HttpStatus.NOT_FOUND);
		}
	}

}
