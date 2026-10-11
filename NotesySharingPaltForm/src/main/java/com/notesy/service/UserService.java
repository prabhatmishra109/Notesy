package com.notesy.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.notesy.dto.PasswordDTO;
import com.notesy.model.ShareNotes;
import com.notesy.model.SummariseNotes;
import com.notesy.model.User;
import com.notesy.repository.ShareNotesRepository;
import com.notesy.repository.SummarizeNotesRepository;
import com.notesy.repository.UserRepository;

@Service
public class UserService {

    private final ShareNotesRepository shareNotesRepository;

    private  SummarizeNotesRepository summarizeNotesRepository;

	private UserRepository userRepository;
	
	
//	private ShareNotesRepository shareNotesRepository;
	@Service
	public class OtpService {

	    private Map<String, String> otpStorage = new HashMap<>();

	    public String generateOtp(String email) {
	        String otp = String.valueOf((int)(Math.random() * 900000) + 100000);
	        otpStorage.put(email, otp);
	        return otp;
	    }

	    public boolean verifyOtp(String email, String otp) {
	        return otp.equals(otpStorage.get(email));
	    }

	    public void clearOtp(String email) {
	        otpStorage.remove(email);
	    }
	}
	
	@Service
	public class EmailService {

	    @Autowired
	    private JavaMailSender mailSender;

	    public void sendOtp(String toEmail, String otp) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(toEmail);
	        message.setSubject("Notesy Password Reset OTP");
	        message.setText("Your OTP is: " + otp);

	        mailSender.send(message);
	    }
	}
	
	
	
	public String AiSummary(SummariseNotes summariseNotes) {
		summarizeNotesRepository.save(summariseNotes);
		return "Summary save success";
		
	}

	// method for password updation

	public String updatePassword(PasswordDTO pd, String email) {

		Optional<User> opt = userRepository.findById(email);
		String status = "";
		if (opt.isPresent()) {

			User ad = opt.get();

			String userOldPass = ad.getPassword();

			String reactOldPassword = pd.getOldpass();

			if (userOldPass.equals(reactOldPassword)) {

				String cpass = pd.getConfirmpass();

				ad.setPassword(cpass);
				userRepository.save(ad);// password save success

				return status = "success";
			}
			return status = "error";
		}

		return status;

	}
	
	

	// method for edit profile
	public User editProfile(User modifiedUserObject, String email) {

		Optional<User> opt = userRepository.findById(email);

		User ad = null;
		if (opt.isPresent()) {

			ad = opt.get();// fetch the admin object based on email

			// overwrite old date withmodified data
			String modifiedName = modifiedUserObject.getName();

			String modifiedPhone = modifiedUserObject.getPhone();

			String modifiedCity = modifiedUserObject.getCity();
			ad.setName(modifiedName);

			ad.setPhone(modifiedPhone);
			ad.setCity(modifiedCity);

			userRepository.save(ad);
		}
		return ad;

	}

	public UserService(UserRepository userRepository, SummarizeNotesRepository summarizeNotesRepository, ShareNotesRepository shareNotesRepository) {

		this.userRepository = userRepository;

		this.summarizeNotesRepository = summarizeNotesRepository;

		this.shareNotesRepository = shareNotesRepository;
	}

	public String registration(User user) {

		userRepository.save(user);

		return "Contact Add sucessFully";

	}

	public User getProfile(String email) {
		Optional<User> opt = userRepository.findById(email);
		User user = null;
		if (opt.isPresent()) {

			user = opt.get();
		}
		return user;
	}
	public ResponseEntity<?> uploadFile(ShareNotes sharenotes, MultipartFile pdfFile) {

	    Map<String, String> response = new HashMap<>();
	    
	    
	    String file = sharenotes.getFileName();
	    String remail=sharenotes.getReceiverEmail();
	    String semail=sharenotes.getSenderEmail();
	    String subj=sharenotes.getSubject();
	    
	    try {

	       
	        Optional<User> user = userRepository.findByEmail(sharenotes.getReceiverEmail());

	        if (user.isEmpty()) {
	            response.put("message", "Invalid receiver email");
	            return ResponseEntity.badRequest().body(response);
	        }

	     
	        String pdfFileName = pdfFile.getOriginalFilename();
	     
	        String projectRoot = System.getProperty("user.dir");
	        String uploadDir = projectRoot + "/uploads/notessummarizefile";

	        File targetFile = new File(uploadDir, pdfFileName);
	        pdfFile.transferTo(targetFile);

	        String fileURL = "http://localhost:8080/uploads/notessummarizefile/" + pdfFileName;

	     
	        sharenotes.setFileName(pdfFileName);
	        sharenotes.setReceiverEmail(remail);
	        sharenotes.setSenderEmail(semail);
	        sharenotes.setSubject(subj);
	        shareNotesRepository.save(sharenotes);

	        response.put("fileURL", fileURL);
	        response.put("message", "File shared successfully");

	        return ResponseEntity.ok(response);

	    } catch (Exception e) {
	        e.printStackTrace();
	        response.put("message", "File upload failed");
	        return ResponseEntity.internalServerError().body(response);
	    }
	}
	public Map<String, String> uploadPic(User user, MultipartFile imageFile) {
		String fileName = imageFile.getOriginalFilename();

		long timestamp = System.currentTimeMillis() % 100000000;
		System.out.println(timestamp);

		String uniqueFileName = timestamp + "_" + fileName;

		// goto root directory

		String projectRoot = System.getProperty("user.dir");

		System.out.println("project  is" + projectRoot);

		// reach to upload dicrectory

		String uploadDir = projectRoot + "/uploads/userprofileimages";

		Map<String, String> imageMap = new HashMap<>();

		try {

			// setting the target folder for image upload with image name

			File targetFile = new File(uploadDir, uniqueFileName);

			imageFile.transferTo(targetFile);
			


			// generating image url

			String IMAGEURL = "http://localhost:8080/uploads/userprofileimages/" + uniqueFileName;
			String email = user.getEmail();
			Optional<User> opt = userRepository.findById(email);

			if (opt.isPresent()) {
				User ad = opt.get();
				String desc = user.getDescription();

				ad.setDescription(desc);
				ad.setProfilePic(uniqueFileName);
				userRepository.save(ad);

				imageMap.put("imageURL", IMAGEURL);
				imageMap.put("email", email);

			}

		} catch (

		Exception e) {
			e.printStackTrace();
			System.out.println("image upload failed");
		}
		return imageMap;
	}

	public List<SummariseNotes> HistoryNotes(String email) {
		return summarizeNotesRepository.findByEmail(email);
		
	}
//	
//	public List<SummariseNotes> HistoryNotes1(String email) {
//		return summarizeNotesRepository.findAll();
//		
//	}
//	
	
//	public SummariseNotes HistoryNotes(Integer email) {
//		Optional<SummariseNotes> opt = summarizeNotesRepository.findById(email);
//		SummariseNotes notess = null;
//		if (opt.isPresent()) {
//
//			notess = opt.get();
//		}
//		return notess;
//	}
	
	public List<ShareNotes> getNotesByReceiver(String email) {
	    return shareNotesRepository.findByreceiverEmail(email);
	}
	
	public String checkEmail(String email) {
	String status="";	
	Optional<User> opt=	userRepository.findById(email);
	
	if(opt.isPresent()) {
		
		status="exists";
		
	}
		return status;
	}
	
	
	public ResponseEntity<?> convertToPdf(MultipartFile file) {

	    try {

	        // 🔹 1. Save uploaded file
	        String projectRoot = System.getProperty("user.dir");
	        String uploadDir = projectRoot + "/uploads/pdfconvert";

	        File dir = new File(uploadDir);
	        if (!dir.exists()) dir.mkdirs();

	        File inputFile = new File(uploadDir, file.getOriginalFilename());
	        file.transferTo(inputFile);

	        // 🔹 2. LibreOffice convert command
	        ProcessBuilder pb = new ProcessBuilder(
	                "C:\\Program Files\\LibreOffice\\program\\soffice.exe", // full path use karo
	                "--headless",
	                "--convert-to", "pdf",
	                inputFile.getAbsolutePath(),
	                "--outdir", uploadDir
	        );

	        pb.redirectErrorStream(true);
	        Process process = pb.start();
	        process.waitFor();

	        // 🔹 3. Converted file name
	        String pdfName = inputFile.getName().replaceAll("\\.[^.]+$", ".pdf");
	        File pdfFile = new File(uploadDir, pdfName);

	        if (!pdfFile.exists()) {
	            return ResponseEntity.status(500).body("Conversion failed");
	        }

	        // 🔹 4. Read PDF
	        byte[] pdfBytes = java.nio.file.Files.readAllBytes(pdfFile.toPath());

	        // 🔹 5. Return PDF
	        return ResponseEntity.ok()
	                .header("Content-Disposition", "attachment; filename=" + pdfName)
	                .header("Content-Type", "application/pdf")
	                .body(pdfBytes);

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(500).body("Error converting file");
	    }
	}

	
}
