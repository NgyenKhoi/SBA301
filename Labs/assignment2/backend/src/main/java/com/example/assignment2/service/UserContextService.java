package com.example.assignment2.service;

import org.springframework.stereotype.Service;

@Service
public class UserContextService {
    
    // Temporary solution - in real app, this would come from JWT token or session
    private static final ThreadLocal<Integer> currentUserId = new ThreadLocal<>();
    
    public void setCurrentUserId(Integer userId) {
        currentUserId.set(userId);
    }
    
    public Integer getCurrentUserId() {
        // For now, return a default admin user ID for testing
        // In real implementation, this would extract from JWT token
        return currentUserId.get() != null ? currentUserId.get() : 1;
    }
    
    public void clear() {
        currentUserId.remove();
    }
}