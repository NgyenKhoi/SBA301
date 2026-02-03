package com.example.assignment2.service;

import com.example.assignment2.dto.NewsArticleRequest;
import com.example.assignment2.entities.*;
import com.example.assignment2.repository.NewsArticleRepository;
import com.example.assignment2.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class NewsArticleService {
    
    @Autowired
    private NewsArticleRepository newsArticleRepository;
    
    @Autowired
    private SystemAccountService accountService;
    
    @Autowired
    private CategoryService categoryService;
    
    @Autowired
    private TagRepository tagRepository;
    
    // Public method - no authentication required
    public List<NewsArticle> getActiveNewsArticles() {
        return newsArticleRepository.findByNewsStatusTrue();
    }
    
    public List<NewsArticle> getAllNewsArticles(Integer currentUserId) {
        checkStaffRole(currentUserId);
        return newsArticleRepository.findAll();
    }
    
    public List<NewsArticle> getMyNewsArticles(Integer currentUserId) {
        checkStaffRole(currentUserId);
        return newsArticleRepository.findByCreatedById(currentUserId);
    }
    
    public NewsArticle getNewsArticleById(Integer id, Integer currentUserId) {
        NewsArticle article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News article not found"));
        
        // If article is not active, require staff role to view
        if (!article.getNewsStatus()) {
            checkStaffRole(currentUserId);
        }
        
        return article;
    }
    
    public NewsArticle createNewsArticle(NewsArticleRequest request, Integer currentUserId) {
        checkStaffRole(currentUserId);
        
        SystemAccount currentUser = accountService.getAccountById(currentUserId);
        Category category = categoryService.getCategoryById(request.getCategoryId());
        
        NewsArticle article = new NewsArticle();
        article.setNewsTitle(request.getNewsTitle());
        article.setHeadline(request.getHeadline());
        article.setNewsContent(request.getNewsContent());
        article.setNewsSource(request.getNewsSource());
        article.setCategory(category);
        article.setNewsStatus(request.getNewsStatus() != null ? request.getNewsStatus() : true);
        article.setCreatedBy(currentUser);
        article.setCreatedDate(Instant.now());
        
        NewsArticle savedArticle = newsArticleRepository.save(article);
        
        // Handle tags if provided
        if (request.getTags() != null && !request.getTags().isEmpty()) {
            handleArticleTags(savedArticle, request.getTags());
        }
        
        return savedArticle;
    }
    
    public NewsArticle updateNewsArticle(Integer id, NewsArticleRequest request, Integer currentUserId) {
        checkStaffRole(currentUserId);
        
        NewsArticle article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News article not found"));
        
        SystemAccount currentUser = accountService.getAccountById(currentUserId);
        Category category = categoryService.getCategoryById(request.getCategoryId());
        
        article.setNewsTitle(request.getNewsTitle());
        article.setHeadline(request.getHeadline());
        article.setNewsContent(request.getNewsContent());
        article.setNewsSource(request.getNewsSource());
        article.setCategory(category);
        article.setNewsStatus(request.getNewsStatus() != null ? request.getNewsStatus() : article.getNewsStatus());
        article.setUpdatedBy(currentUser);
        article.setModifiedDate(Instant.now());
        
        NewsArticle savedArticle = newsArticleRepository.save(article);
        
        // Handle tags if provided
        if (request.getTags() != null) {
            handleArticleTags(savedArticle, request.getTags());
        }
        
        return savedArticle;
    }
    
    public void deleteNewsArticle(Integer id, Integer currentUserId) {
        checkStaffRole(currentUserId);
        
        NewsArticle article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News article not found"));
        
        newsArticleRepository.delete(article);
    }
    
    public List<NewsArticle> searchNewsArticles(String searchTerm, Integer currentUserId) {
        checkStaffRole(currentUserId);
        return newsArticleRepository.searchByTitleOrContent(searchTerm);
    }
    
    public List<NewsArticle> searchActiveNewsArticles(String searchTerm) {
        return newsArticleRepository.searchActiveByTitleOrContent(searchTerm);
    }
    
    private void handleArticleTags(NewsArticle article, List<String> tagNames) {
        // Create/find tags but don't link them to articles yet
        // This requires implementing the NewsTag relationship handling
        
        for (String tagName : tagNames) {
            if (tagName != null && !tagName.trim().isEmpty()) {
                Tag tag = tagRepository.findByTagName(tagName.trim())
                        .orElseGet(() -> {
                            Tag newTag = new Tag();
                            newTag.setTagName(tagName.trim());
                            return tagRepository.save(newTag);
                        });
                
                // Here you would create NewsTag entities to link the article and tag
                // This requires implementing the NewsTag repository and service
            }
        }
    }
    
    private void checkStaffRole(Integer accountId) {
        SystemAccount account = accountService.getAccountById(accountId);
        if (account.getAccountRole() != 1 && account.getAccountRole() != 2) {
            throw new RuntimeException("Access denied. Staff or Admin role required.");
        }
    }
}