package com.example.assignment2.repository;

import com.example.assignment2.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT COUNT(n) > 0 FROM NewsArticle n WHERE n.category.id = :categoryId")
    boolean hasNewsArticles(Integer categoryId);
    
    List<Category> findByCategoryNameContainingIgnoreCase(String categoryName);
}