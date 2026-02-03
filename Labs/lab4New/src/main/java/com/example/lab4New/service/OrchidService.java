package com.example.lab4New.service;

import com.example.lab4New.entities.Orchid;
import com.example.lab4New.repository.IOrchidRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    private final IOrchidRepository iOrchidRepository;

    public OrchidService(IOrchidRepository iOrchidRepository) {
        this.iOrchidRepository = iOrchidRepository;
    }

    @Override
    public List<Orchid> getAllOrchids() {
        return iOrchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        return iOrchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Optional<Orchid> optionalOrchid = iOrchidRepository.findById(orchidID);

        if (optionalOrchid.isPresent()) {
            Orchid o = optionalOrchid.get();
            o.setName(orchid.getName());
            o.setOrchidDescription(orchid.getOrchidDescription());
            o.setOrchidCategory(orchid.getOrchidCategory());
            o.setIsNatural(orchid.getIsNatural());
            o.setIsAttractive(orchid.getIsAttractive());
            o.setOrchidUrl(orchid.getOrchidUrl());

            return iOrchidRepository.save(o);
        }
        return null;
    }

    @Override
    public void deleteOrchid(int orchidID) {
        iOrchidRepository.deleteById(orchidID);
    }

    @Override
    public Optional<Orchid> getOrchidByID(int orchidID) {
        return iOrchidRepository.findById(orchidID);
    }
}