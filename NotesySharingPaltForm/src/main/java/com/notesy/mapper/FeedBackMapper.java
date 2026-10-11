package com.notesy.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.notesy.model.Feedback;
import com.notesy.model.User;

public class FeedBackMapper implements RowMapper<Feedback> {

	Feedback feedback = null;

	@Override
	public Feedback mapRow(ResultSet rs, int rowNum) throws SQLException {

		System.out.println(rowNum);

//		String email = rs.getString("email");
//		String rating = rs.getString("rating");
//		String review = rs.getString("review");
//
//		// creating objectject od feedback class
//
//		feedback = new Feedback(email, review, rating);

		// using fetching data from user and feedback table

		String rating = rs.getString("rating");
		String review = rs.getString("review");
		String userName = rs.getString("name");

		// user has a name and feedback has user

//		User u = new User();

		User u = new User();

		u.setName(userName);

		feedback = new Feedback();

		feedback.setRating(rating);
		feedback.setReview(review);

//		feedback.setUser(u);

		feedback.setUser(u);

		return feedback;
	}

}
