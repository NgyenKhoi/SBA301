package com.example.lab5.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lab5.entities.Orchid;

public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
