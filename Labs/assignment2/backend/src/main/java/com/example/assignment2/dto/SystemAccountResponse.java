package com.example.assignment2.dto;

import com.example.assignment2.entities.SystemAccount;
import lombok.Data;

@Data
public class SystemAccountResponse {
    private Integer id;
    private String username;
    private String email;
    private String role;
    private Boolean active;

    public static SystemAccountResponse fromEntity(SystemAccount account) {
        SystemAccountResponse response = new SystemAccountResponse();
        response.setId(account.getId());
        response.setUsername(account.getAccountName());
        response.setEmail(account.getAccountEmail());
        response.setRole(account.getAccountRole() == 1 ? "ADMIN" : "STAFF");
        response.setActive(true); // Default active since entity doesn't have this field
        return response;
    }
}