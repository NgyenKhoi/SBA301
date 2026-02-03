package com.example.assignment2.dto;

import lombok.Data;
import java.util.List;

@Data
public class NewsArticleRequest {
    private String title;
    private String headline;
    private String content;
    private String newsSource;
    private Integer categoryId;
    private Boolean newsStatus;
    private List<String> tags; // List of tag names
    
    // Getters for backward compatibility
    public String getNewsTitle() {
        return title;
    }
    
    public String getHeadline() {
        return headline;
    }
    
    public String getNewsContent() {
        return content;
    }
    
    public String getNewsSource() {
        return newsSource;
    }
    
    public Integer getCategoryId() {
        return categoryId;
    }
    
    public Boolean getNewsStatus() {
        return newsStatus;
    }
    
    public List<String> getTags() {
        return tags;
    }
}