package com.example.lab4.services;
import com.example.lab4.pojos.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IEmployeeService {

    public Employee getEmployeeById(String empId);

    public Employee delete(int id);

    public Employee create(Employee user);

    public Page<Employee> getAllEmployees(Pageable pageable);
}
