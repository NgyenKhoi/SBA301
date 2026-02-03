package com.example.lab5.service;

import java.util.List;

import com.example.lab5.entities.Category;

public interface ICategoryService {
    public List<Category> getAllCategories();
    public Category getCategoryByID(int categoryID);
}