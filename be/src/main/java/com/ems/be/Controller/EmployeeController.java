package com.ems.be.Controller;

import java.util.List;
import org.springframework.web.bind.annotation.RequestMethod;
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

import com.ems.be.Dto.EmployeeDto;
import com.ems.be.Exception.EmployeeNotFoundException;
import com.ems.be.Service.EmployeeService;

@CrossOrigin(
	    origins = "http://localhost:5173",
	    allowedHeaders = "*",
	    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
	)
@RestController
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/create")
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
		
		return employeeService.createEmployee(employeeDto);
		
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
		return employeeService.getAllEmployees();
	}
	
	
	@GetMapping("/find-by/{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) throws EmployeeNotFoundException{
		
		return employeeService.getEmployeeById(id);
	}
	
	@PutMapping("/update-by/{id}")
	public ResponseEntity<EmployeeDto> updateEmployeeById(@PathVariable Long id, @RequestBody EmployeeDto dto) throws EmployeeNotFoundException{
		
		return employeeService.updateEmployeeById(id, dto);
		
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteEmployeeById(@PathVariable Long id) throws EmployeeNotFoundException{
		
		return employeeService.deleteEmployeeById(id);
	}
	
	
	//localhost:8080/employee/filter-by?byName=id&byDirection=ASC
	
	@GetMapping("/filter-by")
	public ResponseEntity<List<EmployeeDto>> filterEmployeesBy(@RequestParam(value = "byName") String value, @RequestParam(value = "byDirection") String direction){
		
		return employeeService.filterEmployeesBy(value, direction);
		
	}
	
	@GetMapping("/pagination/{offset}/{pageSize}")
	public ResponseEntity<List<EmployeeDto>> findEmployeesWithPagination(@PathVariable("offset") int offset, @PathVariable("pageSize") int pageSize){
		
		return employeeService.findEmployeesWithPagination(offset, pageSize);
		
	}
}
