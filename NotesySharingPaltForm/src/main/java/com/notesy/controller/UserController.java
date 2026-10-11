package com.notesy.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.notesy.NotesyApplication;
import com.notesy.dto.PasswordDTO;
import com.notesy.dto.UserDTO;
import com.notesy.model.Feedback;
import com.notesy.model.ShareNotes;
import com.notesy.model.SummariseNotes;
import com.notesy.model.User;
import com.notesy.repository.SummarizeNotesRepository;
import com.notesy.repository.UserRepository;
import com.notesy.service.FeedbackService;
import com.notesy.service.UserLoginService;
import com.notesy.service.UserService;
import com.notesy.service.UserService.EmailService;
import com.notesy.service.UserService.OtpService;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

    private final NotesyApplication notesyApplication;
    
  
    @Autowired
	private SummarizeNotesRepository summarizeRepo;

	@Autowired
	private UserService userService;
	@Autowired
	private FeedbackService feedbackService;

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserLoginService userLoginService;
	
	@Autowired
	private OtpService otpService;

	@Autowired
	private EmailService emailService;
	
	
	

	@PostMapping("/sendOtp/{email}")
	public ResponseEntity<?> sendOtp(@PathVariable String email) {

	    Optional<User> user = userRepository.findById(email);

	    if (user.isEmpty()) {
	        return ResponseEntity.badRequest().body("Email not registered");
	    }

	    String otp = otpService.generateOtp(email);
	    emailService.sendOtp(email, otp);

	    return ResponseEntity.ok("OTP Sent Successfully");
	}
	
	
	@PostMapping("/verifyOtp")
	public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> data) {

	    String email = data.get("email");
	    String otp = data.get("otp");

	    if (otpService.verifyOtp(email, otp)) {
	        return ResponseEntity.ok("OTP Verified");
	    }

	    return ResponseEntity.badRequest().body("Invalid OTP");
	}
	
	@PostMapping("/resetPassword")
	public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> data) {

	    String email = data.get("email");
	    String newPassword = data.get("password");

	    Optional<User> userOpt = userRepository.findById(email);

	    if (userOpt.isPresent()) {
	        User user = userOpt.get();
	        user.setPassword(newPassword);
	        userRepository.save(user);

	        otpService.clearOtp(email);

	        return ResponseEntity.ok("Password Updated Successfully");
	    }

	    return ResponseEntity.badRequest().body("User not found");
	}
	
	 
	
	
	@GetMapping("/History/{email}")

	public ResponseEntity<List<SummariseNotes>> FetchHistory1(@PathVariable String email) {

		List<SummariseNotes> notesList = userService.HistoryNotes(email);

		if (notesList.size() > 0) {
			return ResponseEntity.ok(notesList);

		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
//	@GetMapping("/History/{email}")
//
//	public ResponseEntity<List<SummariseNotes>> FetchHistory(@PathVariable Integer email) {
//
//		List<SummariseNotes> notesList = (List<SummariseNotes>) userService.HistoryNotes(email);
//
//		if (notesList.size() > 0) {
//			return ResponseEntity.ok(notesList);
//
//		} else {
//			return ResponseEntity.notFound().build();
//		}
//	}
	


    UserController(NotesyApplication notesyApplication) {
        this.notesyApplication = notesyApplication;
    }
	
	
	@PostMapping("/summaryId/{email}")
	
	public String AiSummary(@RequestBody SummariseNotes summariseNotes,@PathVariable String email) {
		
		System.out.println(summariseNotes.getTitle());
		System.out.println(summariseNotes.getSummarizeNotes());
		System.out.println(summariseNotes.getEmail());
		return userService.AiSummary(summariseNotes); 
	}

	@PostMapping("/uploadPic")
	public ResponseEntity<Map<String, String>> uploadPic(@RequestPart("profileImageDetail") User user,
			@RequestPart("imageFile") MultipartFile imageFile) {

		System.out.println(user.getDescription());
		System.out.println(imageFile.getOriginalFilename());
		System.out.println(imageFile.getSize());

		Map<String, String> imageMap = userService.uploadPic(user, imageFile);
		return ResponseEntity.ok(imageMap);
	}
	
	
	@PostMapping("/uploadFile")
	public ResponseEntity<?> uploadFile(@RequestPart("notessummarizefile") ShareNotes shareNotes,
			@RequestPart("pdfFile") MultipartFile pdfFile) {

		System.out.println(shareNotes.getSubject());
		System.out.println(pdfFile.getOriginalFilename());
		System.out.println(pdfFile.getSize());

		ResponseEntity<?> filemap = userService.uploadFile(shareNotes, pdfFile);
		return ResponseEntity.ok(filemap);
	}

	// api for update Password

	@PatchMapping("/updatePassword/{email}")

	public String updatePassword(@RequestBody PasswordDTO pd, @PathVariable String email) {

		String message = userService.updatePassword(pd, email);

		return message;
	}

	// api for editProfile
	@PutMapping("/editProfile/{email}")
	public ResponseEntity<User> editProfile(@RequestBody User user, @PathVariable String email) {
		User userObj = userService.editProfile(user, email);
		if (userObj != null) {
			return new ResponseEntity<User>(userObj, HttpStatus.OK);
		} else {

			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/registration")
	public String registration(@RequestBody User user) {

		System.out.println("Email is " + user.getEmail());
		System.out.println("Name is " + user.getName());
		System.out.println("Phone is " + user.getPhone());
		System.out.println("City is " + user.getCity());
		System.out.println("Password is " + user.getPassword());

		return userService.registration(user);
	}

	@PostMapping("/feedback")
	public String feedback(@RequestBody Feedback feedback) {

		System.out.println("Review is " + feedback.getReview());
		System.out.println("Rateing is " + feedback.getRating());
		System.out.println("Email is " + feedback.getEmail());

		return feedbackService.feedback(feedback);

	}

	@PostMapping("/login")
	public String userLogin(@RequestBody User user) {

		return userLoginService.userLogin(user);
	}

	@GetMapping("/userProfile/{email}")
	public ResponseEntity<UserDTO> userProfile(@PathVariable String email) {
		User user = userService.getProfile(email);
		UserDTO dto = null;
		if (user != null) {
//creating object of adminDto

			dto = new UserDTO(user.getName(), user.getPhone(), user.getCity());
			dto.setProfilePic(user.getProfilePic());
			return ResponseEntity.ok(dto);
		} else {
			return new ResponseEntity<UserDTO>(dto, HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/receivenotes/{email}")
	public ResponseEntity<?> getReceivedNotes(@PathVariable String email) {

	    List<ShareNotes> notes = userService.getNotesByReceiver(email);

	    if (notes.isEmpty()) {
	        return ResponseEntity.ok("No notes found");
	    }

	    return ResponseEntity.ok(notes);
	}
	
	@GetMapping("checkEmail/{email}")
	public  String checkEmail(@PathVariable String email) {
		
		System.out.println(email);
		return userService.checkEmail(email);
	}
	
	

	@DeleteMapping("/deleteSummary/{id}")
	public ResponseEntity<?> deleteSummary(@PathVariable int id) {
	    summarizeRepo.deleteById(id);
	    return ResponseEntity.ok("Deleted Successfully");
	}
	
	@PostMapping("/convertToPdf")
	public ResponseEntity<?> convertToPdf(@RequestPart("file") MultipartFile file) {
	    return userService.convertToPdf(file);
	}
	

}
