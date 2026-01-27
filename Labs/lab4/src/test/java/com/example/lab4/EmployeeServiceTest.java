package com.example.lab4;

import com.example.lab4.pojos.Employee;
import com.example.lab4.services.IEmployeeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class EmployeeServiceTest {

    @Autowired
    private IEmployeeService employeeService;

    @Test
    public void testFindAll() {
        Page<Employee> employeePage =
                employeeService.getAllEmployees(PageRequest.of(0, 10));

        assertThat(employeePage).isNotNull();
    }
}
