package com.ems.be.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ems.be.Dto.EmployeeDto;
import com.ems.be.Entity.Employee;
import com.ems.be.Exception.EmployeeNotFoundException;
import com.ems.be.Mapper.EmployeeMapper;
import com.ems.be.Repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	
	public ResponseEntity<EmployeeDto> createEmployee(EmployeeDto employeeDto){
		
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		
		Employee savedEmployee = employeeRepository.save(employee);
		
		EmployeeDto savedEmployeeDto = EmployeeMapper.mapToEmployeeDto(savedEmployee);
		
		return new ResponseEntity<>(savedEmployeeDto, HttpStatus.CREATED);
	}
	
	public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
		
		List<Employee> employees = employeeRepository.findAll();
		
		List<EmployeeDto> employeesDto = new ArrayList<EmployeeDto>();
		
		for(Employee e : employees) {
			employeesDto.add(EmployeeMapper.mapToEmployeeDto(e));
		}
		
		return new ResponseEntity<>(employeesDto, HttpStatus.OK);
		
	}
	
	
	public ResponseEntity<EmployeeDto> getEmployeeById(Long id) throws EmployeeNotFoundException {
		
	    EmployeeDto dto = employeeRepository.findById(id)
	            .map(EmployeeMapper::mapToEmployeeDto)
	            .orElseThrow(() -> new EmployeeNotFoundException("No Record"));

	    return ResponseEntity.ok(dto);
	    
	}
	
	public ResponseEntity<EmployeeDto> updateEmployeeById(Long id, EmployeeDto employeeDto) throws EmployeeNotFoundException {
	    
	    Employee employee = employeeRepository.findById(id)
	            .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with ID: " + id));

	    employee.setFirstName(employeeDto.getFirstName());
	    employee.setLastName(employeeDto.getLastName());
	    employee.setEmailId(employeeDto.getEmailId());

	    Employee updatedEmployee = employeeRepository.save(employee);

	    EmployeeDto dto = EmployeeMapper.mapToEmployeeDto(updatedEmployee);

	    return ResponseEntity.ok(dto);
	}
	
	
	public ResponseEntity<?> deleteEmployeeById(Long id) throws EmployeeNotFoundException{
		
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new EmployeeNotFoundException("EMployee Not Found"));
		
		employeeRepository.delete(employee);
		
		return new ResponseEntity<>(HttpStatus.OK);	
	}
	
	public ResponseEntity<List<EmployeeDto>> filterEmployeesBy(String value, String direction){
		
		Sort.Direction sortBy = direction.equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC;
		
		List<Employee> employees = employeeRepository.findAll(Sort.by(sortBy, value));

				
		List<EmployeeDto> employeeDto = new ArrayList<EmployeeDto>();
		
		for(Employee e : employees) {
			employeeDto.add(EmployeeMapper.mapToEmployeeDto(e));
		}
		
		return new ResponseEntity<>(employeeDto, HttpStatus.OK);
				
	}
	
	public ResponseEntity<List<EmployeeDto>> findEmployeesWithPagination(int offset, int pagination){
		
		Page<Employee> employees = employeeRepository.findAll(PageRequest.of(offset, pagination));
		
		List<EmployeeDto> dto = new ArrayList<EmployeeDto>();
		
		for(Employee e : employees) {
			
			dto.add(EmployeeMapper.mapToEmployeeDto(e));
		}
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
}