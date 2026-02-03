package com.example.lab5.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrchidDTO {
    private Integer id;
    private String name;
    private Boolean isAttractive;
    private Boolean isNatural;
    private String orchidDescription;
    private String orchidUrl;
    private CategoryDTO category;
}