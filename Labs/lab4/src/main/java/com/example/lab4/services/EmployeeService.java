package com.example.lab4.services;

import com.example.lab4.pojos.Employee;
import com.example.lab4.repositories.IEmployeeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements IEmployeeService {

    private final IEmployeeRepository iEmployeeRepository;

    public EmployeeService(IEmployeeRepository iEmployeeRepository) {
        this.iEmployeeRepository = iEmployeeRepository;
    }

    @Override
    public Employee getEmployeeById(String empId) {
        return iEmployeeRepository.getEmployeeById(empId);
    }

    @Override
    public Employee delete(int id) {
        return iEmployeeRepository.delete(id);
    }

    @Override
    public Employee create(Employee user) {
        return iEmployeeRepository.create(user);
    }

    @Override
    public Page<Employee> getAllEmployees(Pageable pageable) {
        return iEmployeeRepository.findAll(pageable);
    }
}
