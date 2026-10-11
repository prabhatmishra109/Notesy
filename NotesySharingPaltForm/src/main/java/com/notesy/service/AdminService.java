package com.notesy.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.notesy.NotesyApplication;
import com.notesy.dto.PasswordDTO;
import com.notesy.model.Admin;
import com.notesy.model.Contact;
import com.notesy.model.Feedback;
import com.notesy.model.User;
import com.notesy.repository.AdminRepository;
import com.notesy.repository.ContactRepository;
import com.notesy.repository.FeedbackRepository;
import com.notesy.repository.UserRepository;

@Service
public class AdminService {

	private final NotesyApplication notesyApplication;
	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private ContactRepository contactRepository;// method for all contacts
	@Autowired
	private FeedbackRepository feedbackRepository;
	@Autowired
	private UserRepository userRepository;

	AdminService(NotesyApplication notesyApplication) {
		this.notesyApplication = notesyApplication;
	}

	// method for password updation

	public String updatePassword(PasswordDTO pd, String email) {

		Optional<Admin> opt = adminRepository.findById(email);
		String status = "";
		if (opt.isPresent()) {

			Admin ad = opt.get();

			String adminOldPass = ad.getPassword();

			String reactOldPassword = pd.getOldpass();

			if (adminOldPass.equals(reactOldPassword)) {

				String cpass = pd.getConfirmpass();

				ad.setPassword(cpass);
				adminRepository.save(ad);// password save success

				return status = "success";
			}
			return status = "error";
		}

		return status;

	}

// method for edit profile
	public Admin editProfile(Admin modifiedAdminObject, String email) {

		Optional<Admin> opt = adminRepository.findById(email);

		Admin ad = null;
		if (opt.isPresent()) {

			ad = opt.get();// fetch the admin object based on email

			// overwrite old date withmodified data
			String modifiedName = modifiedAdminObject.getName();

			String modifiedPhone = modifiedAdminObject.getPhone();
//			String modifiedPassword = modifiedAdminObject.getPassword();
			ad.setName(modifiedName);
//			ad.setPassword(modifiedPassword);
			ad.setPhone(modifiedPhone);

			adminRepository.save(ad);
		}
		return ad;

	}

	public List<Contact> allContacts() {
		return contactRepository.findAll();// select* from contact

	}

	public List<Feedback> allFeedback() {

		return feedbackRepository.findAll();
	}

	public List<User> allUser() {

		return userRepository.findAll();
	}

	public void deleteContact(Integer id) {

		contactRepository.deleteById(id);

	}

	public void deleteFeedback(Integer id) {

		feedbackRepository.deleteById(id);

	}

	public Admin getProfile(String email) {
		Optional<Admin> opt = adminRepository.findById(email);
		Admin admin = null;
		if (opt.isPresent()) {

			admin = opt.get();
		}
		return admin;
	}

	public String adminLogin(Admin admin) {

		String email = admin.getEmail();
		String password = admin.getPassword();
		Optional<Admin> opt = adminRepository.findById(email);
		String message = "";
		if (opt.isPresent()) {
			Admin ad = opt.get();
			// fetch the value from the container(optional)
			if (ad.getPassword().equals(password))

				message = "Success";
			else
				message = "Invaild password";
		} else {

			message = "Invaild email";
		}

		return message;
	}

	public Map<String, String> uploadPic(Admin admin, MultipartFile imageFile) {
		String fileName = imageFile.getOriginalFilename();

		long timestamp = System.currentTimeMillis() % 100000000;
		System.out.println(timestamp);

		String uniqueFileName = timestamp + "_" + fileName;

		// goto root directory

		String projectRoot = System.getProperty("user.dir");

		System.out.println("project  is" + projectRoot);

		// reach to upload dicrectory

		String uploadDir = projectRoot + "/uploads/profileimages";

		Map<String, String> imageMap = new HashMap<>();

		try {

			// setting the target folder for image upload with image name

			File targetFile = new File(uploadDir, uniqueFileName);

			imageFile.transferTo(targetFile);

			// generating image url

			String IMAGEURL = "http://localhost:8080/uploads/profileimages/" + uniqueFileName;
			String email = admin.getEmail();
			Optional<Admin> opt = adminRepository.findById(email);

			if (opt.isPresent()) {
				Admin ad = opt.get();
				String desc = admin.getDescription();

				ad.setDescription(desc);
				ad.setProfilePic(uniqueFileName);
				adminRepository.save(ad);

				imageMap.put("imageURL", IMAGEURL);
				imageMap.put("email", email);

			}

		} catch (

		Exception e) {
			e.printStackTrace();
			System.out.println("mage upload failed");
		}
		return imageMap;
	}
}
