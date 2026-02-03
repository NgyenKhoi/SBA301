package com.example.assignment2.service;

import com.example.assignment2.dto.SystemAccountRequest;
import com.example.assignment2.entities.SystemAccount;
import com.example.assignment2.repository.SystemAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemAccountService {
    
    @Autowired
    private SystemAccountRepository accountRepository;
    
    public List<SystemAccount> getAllAccounts() {
        return accountRepository.findAll();
    }
    
    public SystemAccount getAccountById(Integer id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }
    
    public SystemAccount getAccountByName(String accountName) {
        return accountRepository.findByAccountName(accountName)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }
    
    public SystemAccount createAccount(SystemAccountRequest request) {
        // Validate request
        if (!request.isValidForCreate()) {
            throw new RuntimeException("Invalid account data for creation");
        }
        
        // Check if account name already exists
        if (accountRepository.findByAccountName(request.getAccountName()).isPresent()) {
            throw new RuntimeException("Account name already exists");
        }
        
        // Check if email already exists
        if (accountRepository.findByAccountEmail(request.getAccountEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        SystemAccount account = new SystemAccount();
        account.setAccountName(request.getAccountName());
        account.setAccountEmail(request.getAccountEmail());
        account.setAccountRole(request.getAccountRole());
        account.setAccountPassword(request.getAccountPassword());
        
        return accountRepository.save(account);
    }
    
    public SystemAccount updateAccount(Integer id, SystemAccountRequest request) {
        // Validate request
        if (!request.isValidForUpdate()) {
            throw new RuntimeException("Invalid account data for update");
        }
        
        SystemAccount account = getAccountById(id);
        
        // Check if email is being changed and already exists
        if (!account.getAccountEmail().equals(request.getAccountEmail()) && 
            accountRepository.findByAccountEmail(request.getAccountEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        // Update only allowed fields (NOT username/accountName)
        account.setAccountEmail(request.getAccountEmail());
        account.setAccountRole(request.getAccountRole());
        
        if (request.getAccountPassword() != null && !request.getAccountPassword().isEmpty()) {
            account.setAccountPassword(request.getAccountPassword());
        }
        
        return accountRepository.save(account);
    }
    
    public void deleteAccount(Integer id) {
        if (accountRepository.hasCreatedNewsArticles(id)) {
            throw new RuntimeException("Cannot delete account that has created news articles");
        }
        accountRepository.deleteById(id);
    }
    
    public List<SystemAccount> searchAccounts(String searchTerm) {
        return accountRepository.findByAccountNameContainingIgnoreCaseOrAccountEmailContainingIgnoreCase(
                searchTerm, searchTerm);
    }
    
    public void checkAdminRole(Integer accountId) {
        SystemAccount account = getAccountById(accountId);
        if (account.getAccountRole() != 1) {
            throw new RuntimeException("Access denied. Admin role required.");
        }
    }
    
    public void checkStaffRole(Integer accountId) {
        SystemAccount account = getAccountById(accountId);
        if (account.getAccountRole() != 1 && account.getAccountRole() != 2) {
            throw new RuntimeException("Access denied. Staff or Admin role required.");
        }
    }
}