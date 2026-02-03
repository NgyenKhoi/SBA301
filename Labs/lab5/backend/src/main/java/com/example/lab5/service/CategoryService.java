package com.example.lab5.service;

import org.springframework.stereotype.Service;

import com.example.lab5.entities.Category;
import com.example.lab5.exception.AppException;
import com.example.lab5.exception.ErrorCode;
import com.example.lab5.repository.ICategoryRepository;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    private final ICategoryRepository iCategoryRepository;

    public CategoryService(ICategoryRepository iCategoryRepository) {
        this.iCategoryRepository = iCategoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return iCategoryRepository.findAll();
    }

    @Override
    public Category getCategoryByID(int categoryID) {
        return iCategoryRepository.findById(categoryID)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_REQUEST));
    }
}