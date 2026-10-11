package com.notesy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notesy.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, String> {

}
