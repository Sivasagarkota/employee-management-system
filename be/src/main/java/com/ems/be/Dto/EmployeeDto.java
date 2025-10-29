package com.ems.be.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class EmployeeDto {
	
	private Long id;
	private String firstName;
	private String lastName;
	private String emailId;
	
	public EmployeeDto() {
    	
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
    
    public EmployeeDto(Long id, String firstName, String lastName, String emailId) {
    	this.id = id;
    	this.firstName = firstName;
    	this.lastName = lastName;
    	this.emailId = emailId;
    }
}
