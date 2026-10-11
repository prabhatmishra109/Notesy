package com.notesy.service;

import org.springframework.stereotype.Service;

import com.notesy.model.Feedback;
import com.notesy.repository.FeedbackRepository;

@Service
public class FeedbackService {

	private FeedbackRepository feedbackRepository;

	public FeedbackService(FeedbackRepository feedbackRepository) {
		super();
		this.feedbackRepository = feedbackRepository;
	}

	public String feedback(Feedback feedback) {

		feedbackRepository.save(feedback);

		return "Feedback submit Successfully";
	}
}
