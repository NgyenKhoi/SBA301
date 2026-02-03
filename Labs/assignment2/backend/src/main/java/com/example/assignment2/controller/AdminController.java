package com.example.assignment2.controller;

import com.example.assignment2.dto.SystemAccountRequest;
import com.example.assignment2.dto.SystemAccountResponse;
import com.example.assignment2.entities.SystemAccount;
import com.example.assignment2.service.SystemAccountService;
import com.example.assignment2.service.UserContextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @Autowired
    private SystemAccountService accountService;
    
    @Autowired
    private UserContextService userContextService;
    
    @GetMapping("/accounts")
    public ResponseEntity<List<SystemAccountResponse>> getAllAccounts() {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            accountService.checkAdminRole(currentUserId);
            List<SystemAccount> accounts = accountService.getAllAccounts();
            List<SystemAccountResponse> response = accounts.stream()
                    .map(SystemAccountResponse::fromEntity)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(403).build();
        }
    }
    
    @GetMapping("/accounts/{id}")
    public ResponseEntity<SystemAccountResponse> getAccountById(@PathVariable Integer id) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            accountService.checkAdminRole(currentUserId);
            SystemAccount account = accountService.getAccountById(id);
            return ResponseEntity.ok(SystemAccountResponse.fromEntity(account));
        } catch (Exception e) {
            return ResponseEntity.status(403).build();
        }
    }
    
    @PostMapping("/accounts")
    public ResponseEntity<SystemAccountResponse> createAccount(@RequestBody SystemAccountRequest request) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            accountService.checkAdminRole(currentUserId);
            SystemAccount account = accountService.createAccount(request);
            return ResponseEntity.ok(SystemAccountResponse.fromEntity(account));
        } catch (RuntimeException e) {
            System.err.println("Create account error: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
    
    @PutMapping("/accounts/{id}")
    public ResponseEntity<SystemAccountResponse> updateAccount(@PathVariable Integer id, @RequestBody SystemAccountRequest request) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            accountService.checkAdminRole(currentUserId);
            SystemAccount account = accountService.updateAccount(id, request);
            return ResponseEntity.ok(SystemAccountResponse.fromEntity(account));
        } catch (RuntimeException e) {
            System.err.println("Update account error: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
    
    @DeleteMapping("/accounts/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Integer id) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            accountService.checkAdminRole(currentUserId);
            accountService.deleteAccount(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Cannot delete account")) {
                return ResponseEntity.status(409).build(); // Conflict
            }
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/accounts/search")
    public ResponseEntity<List<SystemAccountResponse>> searchAccounts(@RequestParam String q) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            accountService.checkAdminRole(currentUserId);
            List<SystemAccount> accounts = accountService.searchAccounts(q);
            List<SystemAccountResponse> response = accounts.stream()
                    .map(SystemAccountResponse::fromEntity)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(403).build();
        }
    }
}