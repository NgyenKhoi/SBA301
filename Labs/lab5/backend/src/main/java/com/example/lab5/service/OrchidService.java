package com.example.lab5.service;

import org.springframework.stereotype.Service;

import com.example.lab5.entities.Category;
import com.example.lab5.entities.Orchid;
import com.example.lab5.exception.AppException;
import com.example.lab5.exception.ErrorCode;
import com.example.lab5.repository.ICategoryRepository;
import com.example.lab5.repository.IOrchidRepository;

import java.util.List;

@Service
public class OrchidService implements IOrchidService {

    private final IOrchidRepository iOrchidRepository;
    private final ICategoryRepository iCategoryRepository;

    public OrchidService(IOrchidRepository iOrchidRepository, ICategoryRepository iCategoryRepository) {
        this.iOrchidRepository = iOrchidRepository;
        this.iCategoryRepository = iCategoryRepository;
    }

    @Override
    public List<Orchid> getAllOrchids() {
        return iOrchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        if (orchid == null) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        
        // Ensure category exists and is managed
        if (orchid.getCategory() != null && orchid.getCategory().getId() != null) {
            Category category = iCategoryRepository.findById(orchid.getCategory().getId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
            orchid.setCategory(category);
        }
        
        return iOrchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Orchid o = iOrchidRepository.findById(orchidID)
                .orElseThrow(() -> new AppException(ErrorCode.ORCHID_NOT_FOUND));

        o.setName(orchid.getName());
        o.setOrchidDescription(orchid.getOrchidDescription());
        o.setIsNatural(orchid.getIsNatural());
        o.setIsAttractive(orchid.getIsAttractive());
        o.setOrchidUrl(orchid.getOrchidUrl());
        
        // Ensure category exists and is managed
        if (orchid.getCategory() != null && orchid.getCategory().getId() != null) {
            Category category = iCategoryRepository.findById(orchid.getCategory().getId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
            o.setCategory(category);
        }

        return iOrchidRepository.save(o);
    }

    @Override
    public void deleteOrchid(int orchidID) {
        Orchid o = iOrchidRepository.findById(orchidID)
                .orElseThrow(() -> new AppException(ErrorCode.ORCHID_NOT_FOUND));

        iOrchidRepository.delete(o);
    }

    @Override
    public Orchid getOrchidByID(int orchidID) {
        return iOrchidRepository.findById(orchidID)
                .orElseThrow(() -> new AppException(ErrorCode.ORCHID_NOT_FOUND));
    }
}
