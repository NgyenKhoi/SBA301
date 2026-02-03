package com.example.assignment2.repository;

import com.example.assignment2.entities.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SystemAccountRepository extends JpaRepository<SystemAccount, Integer> {
    Optional<SystemAccount> findByAccountEmail(String email);
    Optional<SystemAccount> findByAccountName(String accountName);
    
    List<SystemAccount> findByAccountNameContainingIgnoreCaseOrAccountEmailContainingIgnoreCase(
            String accountName, String accountEmail);
    
    @Query("SELECT COUNT(n) > 0 FROM NewsArticle n WHERE n.createdBy.id = :accountId")
    boolean hasCreatedNewsArticles(Integer accountId);
}