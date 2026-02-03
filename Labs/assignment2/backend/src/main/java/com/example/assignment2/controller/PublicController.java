package com.example.assignment2.controller;

import com.example.assignment2.dto.NewsArticleResponse;
import com.example.assignment2.entities.NewsArticle;
import com.example.assignment2.service.NewsArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public")
public class PublicController {
    
    @Autowired
    private NewsArticleService newsArticleService;
    
    @GetMapping("/news")
    public ResponseEntity<List<NewsArticleResponse>> getActiveNews() {
        List<NewsArticle> activeNews = newsArticleService.getActiveNewsArticles();
        List<NewsArticleResponse> response = activeNews.stream()
                .map(NewsArticleResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/news/{id}")
    public ResponseEntity<NewsArticleResponse> getActiveNewsById(@PathVariable Integer id) {
        try {
            NewsArticle article = newsArticleService.getNewsArticleById(id, null);
            if (article.getNewsStatus()) {
                return ResponseEntity.ok(NewsArticleResponse.fromEntity(article));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/news/search")
    public ResponseEntity<List<NewsArticleResponse>> searchActiveNews(@RequestParam String q) {
        List<NewsArticle> news = newsArticleService.searchActiveNewsArticles(q);
        List<NewsArticleResponse> response = news.stream()
                .map(NewsArticleResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
}