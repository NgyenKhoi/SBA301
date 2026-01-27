package com.example.lab4.repositories;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Collections;
import com.example.lab4.pojos.Employee;
import org.springframework.stereotype.Repository;

@Repository
public class EmployeeRepository implements IEmployeeRepository {
    private List<Employee> employees = createList();

    private static List<Employee> createList() {
        List<Employee> temp = new ArrayList<>();
        Collections.addAll(temp,
        new Employee("EMP01", "User 1", "Tech Lead", 5000),
        new Employee("EMP02", "User 2", "Fresher", 1000),
        new Employee("EMP03", "User 3", "Junior", 2000),
        new Employee("EMP04", "User 4", "Middle", 3000),
        new Employee("EMP05", "User 5", "Senior", 4000),
        new Employee("EMP06", "User 6", "CEO", 6000)
        );
        return temp;
    }

    public List<Employee> getAllEmployees() {
        return employees;
    }

    public Employee getEmployeeById(String empId) {
        Employee tmpEmployee = null;

        for (Employee emp : employees) {
            if (emp.getEmpId().equals(empId)) {
                tmpEmployee = emp;
                break;
            }
        }

        return tmpEmployee;
    }

    public Employee delete(int id) {
        Employee deletedEmp = null;

        for (Employee emp : employees) {
            if (emp.getEmpId().equals(id)) {
                employees.remove(emp);
                deletedEmp = emp;
                break;
            }
        }

        return deletedEmp;
    }

    public Employee create(Employee user) {
        employees.add(user);
        System.out.println(employees);
        return user;
    }

    public List<Employee> findAll(Sort sort) {
        return employees;
    }

    public Page<Employee> findAll(Pageable pageable) {
        List<Employee> allEmployees = createList(); // lấy data từ createList()

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), allEmployees.size());

        List<Employee> pageContent = allEmployees.subList(start, end);

        return new PageImpl<>(pageContent, pageable, allEmployees.size());
    }
}
