package com.example.assignment2.service;

import com.example.assignment2.dto.CategoryRequest;
import com.example.assignment2.entities.Category;
import com.example.assignment2.entities.SystemAccount;
import com.example.assignment2.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private SystemAccountService accountService;
    
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    public Category getCategoryById(Integer id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }
    
    public Category createCategory(CategoryRequest request, Integer currentUserId) {
        checkStaffRole(currentUserId);
        
        Category category = new Category();
        category.setCategoryName(request.getCategoryName());
        category.setCategoryDescription(request.getCategoryDescription());
        category.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
        
        if (request.getParentCategoryId() != null) {
            Category parentCategory = getCategoryById(request.getParentCategoryId());
            category.setParentCategory(parentCategory);
        }
        
        return categoryRepository.save(category);
    }
    
    public Category updateCategory(Integer id, CategoryRequest request, Integer currentUserId) {
        checkStaffRole(currentUserId);
        
        Category category = getCategoryById(id);
        category.setCategoryName(request.getCategoryName());
        category.setCategoryDescription(request.getCategoryDescription());
        category.setIsActive(request.getIsActive() != null ? request.getIsActive() : category.getIsActive());
        
        if (request.getParentCategoryId() != null) {
            Category parentCategory = getCategoryById(request.getParentCategoryId());
            category.setParentCategory(parentCategory);
        }
        
        return categoryRepository.save(category);
    }
    
    public void deleteCategory(Integer id, Integer currentUserId) {
        checkStaffRole(currentUserId);
        
        if (categoryRepository.hasNewsArticles(id)) {
            throw new RuntimeException("Cannot delete category that has news articles");
        }
        categoryRepository.deleteById(id);
    }
    
    public List<Category> searchCategories(String searchTerm) {
        return categoryRepository.findByCategoryNameContainingIgnoreCase(searchTerm);
    }
    
    private void checkStaffRole(Integer accountId) {
        SystemAccount account = accountService.getAccountById(accountId);
        if (account.getAccountRole() != 1 && account.getAccountRole() != 2) {
            throw new RuntimeException("Access denied. Staff or Admin role required.");
        }
    }
}