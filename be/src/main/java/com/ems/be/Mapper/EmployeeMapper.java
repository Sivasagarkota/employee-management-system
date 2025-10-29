package com.ems.be.Mapper;

import com.ems.be.Dto.EmployeeDto;
import com.ems.be.Entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {

    	EmployeeDto dto = new EmployeeDto(employee.getId(), 
    								employee.getFirstName(), 
    								employee.getLastName(),
    								employee.getEmailId()
    						);
    	return dto;
    			
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmailId()
        );
    }
}
