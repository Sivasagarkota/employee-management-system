package com.javaguides.springboot_backend.service;

import java.util.List;
import java.util.Optional;

import org.hibernate.query.SortDirection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.javaguides.springboot_backend.exceptions.EmployeeNotFoundException;
import com.javaguides.springboot_backend.model.Employee;
import com.javaguides.springboot_backend.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepo;
	
	public List<Employee> getAllEmployees(){
		return employeeRepo.findAll();
	}
	
	public Optional<Employee> getEmployeeById(Long id) {
		
		return employeeRepo.findById(id);
	}
	
	public void addEmployee(Employee employee) {
		
		employeeRepo.save(employee);
	}
	
	public Employee updateEmployee(Long id, Employee updatedEmployee) throws EmployeeNotFoundException {
		
		Employee employee = employeeRepo.findById(id).orElseThrow(() ->
			new EmployeeNotFoundException("Employee Not Found")
		);
	
		employee.setFirstName(updatedEmployee.getFirstName());
		employee.setLastName(updatedEmployee.getLastName());
		employee.setEmail(updatedEmployee.getEmail());
		
		
		System.out.println(id + "  " + employee.getFirstName() + "  " + employee.getLastName() + " " + employee.getEmail());
		
		return employeeRepo.save(employee);
	}
	
	public void deleteEmployeeByid(Long id) {
		
		employeeRepo.deleteById(id);
	}
	
	public List<Employee> findEmployeeByFirstName(String name){
		
		List<Employee> employees = employeeRepo.findByFirstNameStartingWith(name);
		return employees;
	}
	
	public List<Employee> filterEmployeesBy(String byName, String direction) {
		
	    Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") 
	                                   ? Sort.Direction.DESC 
	                                   : Sort.Direction.ASC;

	    return employeeRepo.findAll(Sort.by(sortDirection, byName));
	}

}
