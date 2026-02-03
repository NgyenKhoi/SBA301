package com.example.assignment2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String role;
    private Integer accountId;
    private String accountName;
    private String message;
}