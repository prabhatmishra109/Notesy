package com.notesy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notesy.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

}
