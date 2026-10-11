package com.notesy.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.notesy.mapper.FeedBackMapper;
import com.notesy.model.Feedback;

@Repository
public class CommonRepository {
	@Autowired
	private JdbcTemplate jdbcTemplate;

//	public List<Feedback> fetchFeedback() {
//
//		String sql = "select * from feedback   order by id desc  ";
//		List<Feedback> feedbackList = jdbcTemplate.query(sql, new FeedBackMapper());
//
//		return feedbackList;
//	}

	public List<Feedback> fetchFeedback() {
//alias means another table of name through we can refer the table  nick name

//		user table-u

//		feedback table-f
		String sql = " select u.name,f.rating,f.review from user u,feedback f where u.email=f.email order by f.id desc limit 10  ";
		List<Feedback> feedbackList = jdbcTemplate.query(sql, new FeedBackMapper());

		return feedbackList;
	}

}
