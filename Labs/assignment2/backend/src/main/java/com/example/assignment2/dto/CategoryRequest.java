package com.example.assignment2.dto;

import lombok.Data;

@Data
public class CategoryRequest {
    private String name;
    private String description;
    private Integer parentCategoryId;
    private Boolean isActive;
    
    // Getters for backward compatibility
    public String getCategoryName() {
        return name;
    }
    
    public String getCategoryDescription() {
        return description;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
}