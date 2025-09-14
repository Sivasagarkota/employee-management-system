package com.javaguides.springboot_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="email_id")
	private String emailId;
	
    public Long getId() { 
    	return id;
    }
    
    public String getFirstName() { 
    	return firstName;
    }
    
    public String getLastName() { 
    	return lastName; 
    }
    
    public String getEmail() {
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
    
    public void setEmail(String emailId) { 
    	this.emailId = emailId; 
    }
	
	public Employee(String firstName, String lastName, String emailId) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
	}
	
	public Employee() {
		
	}
}
