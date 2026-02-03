package com.example.lab5.service;

import java.util.List;

import com.example.lab5.entities.Orchid;

public interface IOrchidService {
    public List<Orchid> getAllOrchids();

    public Orchid insertOrchid(Orchid orchid);

    public Orchid updateOrchid(int orchidID, Orchid orchid);

    public void deleteOrchid(int orchidID);

    Orchid getOrchidByID(int orchidID);
}
