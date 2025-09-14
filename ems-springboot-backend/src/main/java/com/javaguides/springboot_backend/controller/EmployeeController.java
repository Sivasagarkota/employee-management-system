package com.javaguides.springboot_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.javaguides.springboot_backend.exceptions.EmployeeNotFoundException;
import com.javaguides.springboot_backend.model.Employee;
import com.javaguides.springboot_backend.service.EmployeeService;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/employee")
	public void addEmployee(@RequestBody Employee employee) {
		employeeService.addEmployee(employee);
	}

	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeService.getAllEmployees();
	}

	@GetMapping("/employee/{id}")
	public Optional<Employee> getEmployeeById(@PathVariable("id") Long id) {
		return employeeService.getEmployeeById(id);	
	}
	
	@PutMapping("/employee/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Long id, @RequestBody Employee updatedEmployee) throws EmployeeNotFoundException {
	    Employee employee = employeeService.updateEmployee(id, updatedEmployee);
	    return ResponseEntity.ok(employee);  
	}
	
	@DeleteMapping("/employee/{id}")
	public void deleteEmployeeById(@PathVariable("id") Long id) {
		employeeService.deleteEmployeeByid(id);
	}
	
	@GetMapping("/find-employee")
	public List<Employee> findEmployeeByFirstName(@RequestParam String name) {
		return employeeService.findEmployeeByFirstName(name);
	}

	//	http://localhost:8080/api/employees/filterBy?byName=firstName&direction=desc
	@GetMapping("/employees/filterBy")
	public List<Employee> filterEmployeesBy(@RequestParam(value="byName", required=false, defaultValue="id") String byName,
											@RequestParam(value="direction", required=false, defaultValue="asc") String direction){
		
		return employeeService.filterEmployeesBy(byName, direction);
	}
	

}

