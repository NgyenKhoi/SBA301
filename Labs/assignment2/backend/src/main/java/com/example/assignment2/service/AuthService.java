package com.example.assignment2.service;

import com.example.assignment2.dto.LoginRequest;
import com.example.assignment2.dto.LoginResponse;
import com.example.assignment2.entities.SystemAccount;
import com.example.assignment2.repository.SystemAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private SystemAccountRepository accountRepository;
    
    public LoginResponse login(LoginRequest loginRequest) {
        Optional<SystemAccount> accountOpt = accountRepository.findByAccountEmail(loginRequest.getEmail());
        
        if (accountOpt.isPresent()) {
            SystemAccount account = accountOpt.get();
            if (account.getAccountPassword().equals(loginRequest.getPassword())) {
                String role = account.getAccountRole() == 1 ? "ADMIN" : "STAFF";
                return new LoginResponse(role, account.getId(), account.getAccountName(), "Login successful");
            }
        }
        
        throw new RuntimeException("Invalid email or password");
    }
    
    public SystemAccount getCurrentUser(String email) {
        return accountRepository.findByAccountEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}