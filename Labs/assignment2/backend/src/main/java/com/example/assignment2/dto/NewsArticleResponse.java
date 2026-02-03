package com.example.assignment2.dto;

import com.example.assignment2.entities.NewsArticle;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;

@Data
public class NewsArticleResponse {
    private Integer id;
    private String title;
    private String content;
    private CategoryResponse category;
    private SystemAccountResponse author;
    private List<TagResponse> tags;
    private String createdAt;
    private String updatedAt;

    public static NewsArticleResponse fromEntity(NewsArticle article) {
        NewsArticleResponse response = new NewsArticleResponse();
        response.setId(article.getId());
        response.setTitle(article.getNewsTitle());
        response.setContent(article.getNewsContent());
        
        if (article.getCategory() != null) {
            response.setCategory(CategoryResponse.fromEntity(article.getCategory()));
        }
        
        if (article.getCreatedBy() != null) {
            response.setAuthor(SystemAccountResponse.fromEntity(article.getCreatedBy()));
        }
        
        response.setTags(new ArrayList<>()); // Empty for now, will implement tags later
        response.setCreatedAt(article.getCreatedDate() != null ? article.getCreatedDate().toString() : "");
        response.setUpdatedAt(article.getModifiedDate() != null ? article.getModifiedDate().toString() : "");
        
        return response;
    }
}