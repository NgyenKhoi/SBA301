package com.example.lab4New.repository;

import com.example.lab4New.entities.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
