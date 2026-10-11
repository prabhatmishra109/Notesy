package com.notesy.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notesy.model.User;
import com.notesy.repository.UserLoginRepository;

@Service
public class UserLoginService {

	@Autowired
	private UserLoginRepository UserLoginRepository;

	public String userLogin(User user) {

		String email = user.getEmail();
		String password = user.getPassword();
		Optional<User> opt = UserLoginRepository.findById(email);
		String message = "";
		if (opt.isPresent()) {
			User ur = opt.get();
			// fetch the value from the container(optional)
			if (ur.getPassword().equals(password))

				message = "Success";
			else
				message = "Invaild password";
		} else {

			message = "Invaild email";
		}

		return message;
	}

}
