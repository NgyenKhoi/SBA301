package com.example.assignment2.dto;

import com.example.assignment2.entities.Tag;
import lombok.Data;

@Data
public class TagResponse {
    private Integer id;
    private String name;

    public static TagResponse fromEntity(Tag tag) {
        TagResponse response = new TagResponse();
        response.setId(tag.getId());
        response.setName(tag.getTagName());
        return response;
    }
}