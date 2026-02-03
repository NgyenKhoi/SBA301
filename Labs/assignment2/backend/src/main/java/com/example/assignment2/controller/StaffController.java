package com.example.assignment2.controller;

import com.example.assignment2.dto.*;
import com.example.assignment2.entities.Category;
import com.example.assignment2.entities.NewsArticle;
import com.example.assignment2.service.CategoryService;
import com.example.assignment2.service.NewsArticleService;
import com.example.assignment2.service.UserContextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/staff")
public class StaffController {
    
    @Autowired
    private CategoryService categoryService;
    
    @Autowired
    private NewsArticleService newsArticleService;
    
    @Autowired
    private UserContextService userContextService;
    
    // Category Management
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        try {
            List<Category> categories = categoryService.getAllCategories();
            List<CategoryResponse> response = categories.stream()
                    .map(CategoryResponse::fromEntity)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(403).build();
        }
    }
    
    @GetMapping("/categories/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Integer id) {
        try {
            Category category = categoryService.getCategoryById(id);
            return ResponseEntity.ok(CategoryResponse.fromEntity(category));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/categories")
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest request) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            Category category = categoryService.createCategory(request, currentUserId);
            return ResponseEntity.ok(CategoryResponse.fromEntity(category));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/categories/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable Integer id, @RequestBody CategoryRequest request) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            Category category = categoryService.updateCategory(id, request, currentUserId);
            return ResponseEntity.ok(CategoryResponse.fromEntity(category));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            categoryService.deleteCategory(id, currentUserId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Cannot delete category")) {
                return ResponseEntity.status(409).build(); // Conflict
            }
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/categories/search")
    public ResponseEntity<List<CategoryResponse>> searchCategories(@RequestParam String q) {
        try {
            List<Category> categories = categoryService.searchCategories(q);
            List<CategoryResponse> response = categories.stream()
                    .map(CategoryResponse::fromEntity)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // News Article Management
    @GetMapping("/news")
    public ResponseEntity<List<NewsArticleResponse>> getAllNews() {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            List<NewsArticle> news = newsArticleService.getAllNewsArticles(currentUserId);
            List<NewsArticleResponse> response = news.stream()
                    .map(NewsArticleResponse::fromEntity)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(403).build();
        }
    }
    
    @GetMapping("/news/my")
    public ResponseEntity<List<NewsArticleResponse>> getMyNews() {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            List<NewsArticle> news = newsArticleService.getMyNewsArticles(currentUserId);
            List<NewsArticleResponse> response = news.stream()
                    .map(NewsArticleResponse::fromEntity)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(403).build();
        }
    }
    
    @GetMapping("/news/{id}")
    public ResponseEntity<NewsArticleResponse> getNewsById(@PathVariable Integer id) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            NewsArticle article = newsArticleService.getNewsArticleById(id, currentUserId);
            return ResponseEntity.ok(NewsArticleResponse.fromEntity(article));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/news")
    public ResponseEntity<NewsArticleResponse> createNews(@RequestBody NewsArticleRequest request) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            NewsArticle article = newsArticleService.createNewsArticle(request, currentUserId);
            return ResponseEntity.ok(NewsArticleResponse.fromEntity(article));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/news/{id}")
    public ResponseEntity<NewsArticleResponse> updateNews(@PathVariable Integer id, @RequestBody NewsArticleRequest request) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            NewsArticle article = newsArticleService.updateNewsArticle(id, request, currentUserId);
            return ResponseEntity.ok(NewsArticleResponse.fromEntity(article));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/news/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Integer id) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            newsArticleService.deleteNewsArticle(id, currentUserId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/news/search")
    public ResponseEntity<List<NewsArticleResponse>> searchNews(@RequestParam String q) {
        try {
            Integer currentUserId = userContextService.getCurrentUserId();
            List<NewsArticle> news = newsArticleService.searchNewsArticles(q, currentUserId);
            List<NewsArticleResponse> response = news.stream()
                    .map(NewsArticleResponse::fromEntity)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/tags")
    public ResponseEntity<List<TagResponse>> getAllTags() {
        // Placeholder - implement when needed
        return ResponseEntity.ok(List.of());
    }
}