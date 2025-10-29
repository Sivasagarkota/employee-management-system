package com.ems.be.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_id", unique = true)
    private String emailId;
    
    public Employee() {
    	
    }
    
    public Long getId() {
    	return id;
    }
    
    public String getFirstName() {
    	return firstName;
    }
    
    public String getLastName() {
    	return lastName;
    }
    
    public String getEmailId() {
    	return emailId;
    }
    
    public void setId(Long id) {
    	this.id = id;
    }
    
    public void setFirstName(String firstName) {
    	this.firstName = firstName;
    }
    
    public void setLastName(String lastName) {
    	this.lastName = lastName;
    }
    
    public void setEmailId(String emailId) {
    	this.emailId = emailId;
    }
    
    public Employee(Long id, String firstName, String lastName, String emailId) {
    	this.id = id;
    	this.firstName = firstName;
    	this.lastName = lastName;
    	this.emailId = emailId;
    }

}
