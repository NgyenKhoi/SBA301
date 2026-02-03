package com.example.assignment2.dto;

import com.example.assignment2.entities.Category;
import lombok.Data;

@Data
public class CategoryResponse {
    private Integer id;
    private String name;
    private String description;
    private String createdAt;

    public static CategoryResponse fromEntity(Category category) {
        CategoryResponse response = new CategoryResponse();
        response.setId(category.getId());
        response.setName(category.getCategoryName());
        response.setDescription(category.getCategoryDescription());
        response.setCreatedAt("2024-01-01"); // Default since entity doesn't have createdAt
        return response;
    }
}