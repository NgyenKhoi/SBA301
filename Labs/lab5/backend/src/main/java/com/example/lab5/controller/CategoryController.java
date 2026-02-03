package com.example.lab5.controller;

import org.springframework.web.bind.annotation.*;

import com.example.lab5.dto.ApiResponse;
import com.example.lab5.dto.CategoryDTO;
import com.example.lab5.entities.Category;
import com.example.lab5.mapper.OrchidMapper;
import com.example.lab5.service.ICategoryService;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final ICategoryService iCategoryService;
    private final OrchidMapper orchidMapper;

    public CategoryController(ICategoryService iCategoryService, OrchidMapper orchidMapper) {
        this.iCategoryService = iCategoryService;
        this.orchidMapper = orchidMapper;
    }

    // GET all categories
    @GetMapping
    public ApiResponse<List<CategoryDTO>> getAll() {
        List<Category> categories = iCategoryService.getAllCategories();
        List<CategoryDTO> categoryDTOs = orchidMapper.toCategoryDTOList(categories);
        return ApiResponse.success(categoryDTOs);
    }

    // GET by id
    @GetMapping("/{id}")
    public ApiResponse<CategoryDTO> getById(@PathVariable int id) {
        Category category = iCategoryService.getCategoryByID(id);
        CategoryDTO categoryDTO = orchidMapper.toCategoryDTO(category);
        return ApiResponse.success(categoryDTO);
    }
}