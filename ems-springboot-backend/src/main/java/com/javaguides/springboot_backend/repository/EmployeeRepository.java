package com.javaguides.springboot_backend.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.javaguides.springboot_backend.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	List<Employee> findByFirstNameStartingWith(String name);
	

//	@Query("SELECT e FROM Employee e WHERE e.firstName LIKE CONCAT(:startsWith, '%')")
//	List<Employee> findAllByEmployeeStartsWith(@Param("startsWith") String startsWith);
	
}
