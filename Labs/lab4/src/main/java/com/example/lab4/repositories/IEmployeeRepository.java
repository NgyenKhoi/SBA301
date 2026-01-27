package com.example.lab4.repositories;

import com.example.lab4.pojos.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IEmployeeRepository{
    public Employee getEmployeeById(String empId);

    public Employee delete(int id);

    public Employee create(Employee user);

    public List<Employee> getAllEmployees();

    Page<Employee> findAll(Pageable pageable);
}
