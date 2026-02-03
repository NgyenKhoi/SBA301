package com.example.lab5.mapper;

import com.example.lab5.dto.CategoryDTO;
import com.example.lab5.dto.OrchidDTO;
import com.example.lab5.entities.Category;
import com.example.lab5.entities.Orchid;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrchidMapper {

    OrchidMapper INSTANCE = Mappers.getMapper(OrchidMapper.class);

    OrchidDTO toDTO(Orchid orchid);
    
    List<OrchidDTO> toDTOList(List<Orchid> orchids);

    Orchid toEntity(OrchidDTO dto);

    CategoryDTO toCategoryDTO(Category category);
    
    List<CategoryDTO> toCategoryDTOList(List<Category> categories);
    
    Category toCategoryEntity(CategoryDTO dto);
}