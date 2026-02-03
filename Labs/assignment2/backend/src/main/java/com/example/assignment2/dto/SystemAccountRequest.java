package com.example.assignment2.dto;

import lombok.Data;

@Data
public class SystemAccountRequest {
    private String username;
    private String email;
    private Integer role; // 1 = Admin, 2 = Staff
    private String password;
    private Boolean active;
    
    // Getters for backward compatibility
    public String getAccountName() {
        return username;
    }
    
    public String getAccountEmail() {
        return email;
    }
    
    public Integer getAccountRole() {
        return role;
    }
    
    public String getAccountPassword() {
        return password;
    }
    
    // Validation method
    public boolean isValidForCreate() {
        return username != null && !username.trim().isEmpty() &&
               email != null && !email.trim().isEmpty() &&
               password != null && !password.trim().isEmpty() &&
               role != null && (role == 1 || role == 2);
    }
    
    public boolean isValidForUpdate() {
        return email != null && !email.trim().isEmpty() &&
               role != null && (role == 1 || role == 2);
    }
}