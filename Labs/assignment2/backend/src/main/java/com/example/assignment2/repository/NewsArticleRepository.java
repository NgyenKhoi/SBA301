package com.example.assignment2.repository;

import com.example.assignment2.entities.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Integer> {
    List<NewsArticle> findByNewsStatusTrue();
    
    List<NewsArticle> findByCreatedById(Integer createdById);
    
    @Query("SELECT n FROM NewsArticle n WHERE LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(CAST(n.newsContent AS string)) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<NewsArticle> searchByTitleOrContent(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT n FROM NewsArticle n WHERE n.newsStatus = true AND (LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(CAST(n.newsContent AS string)) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<NewsArticle> searchActiveByTitleOrContent(@Param("searchTerm") String searchTerm);
}