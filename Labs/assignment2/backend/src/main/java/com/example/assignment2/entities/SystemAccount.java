package com.example.assignment2.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Table(name = "system_account")
public class SystemAccount {
    @Id
    @Column(name = "account_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "account_name", nullable = false)
    private String accountName;

    @Nationalized
    @Column(name = "account_email", nullable = false)
    private String accountEmail;

    @Column(name = "account_role", nullable = false)
    private Integer accountRole;

    @Nationalized
    @Column(name = "account_password", nullable = false)
    private String accountPassword;

}