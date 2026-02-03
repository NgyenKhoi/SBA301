package com.example.lab4New.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Table(name = "orchid")
public class Orchid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id", nullable = false)
    private Integer id;

    @Column(name = "is_attractive")
    private Boolean isAttractive;

    @Column(name = "is_natural")
    private Boolean isNatural;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "orchid_category")
    private String orchidCategory;

    @Nationalized
    @Lob
    @Column(name = "orchid_description")
    private String orchidDescription;

    @Column(name = "orchid_url", length = 1000)
    private String orchidUrl;

}