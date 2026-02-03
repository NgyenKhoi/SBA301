package com.example.lab5.entities;

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

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "is_attractive")
    private Boolean isAttractive;

    @Column(name = "is_natural")
    private Boolean isNatural;

    @Nationalized
    @Lob
    @Column(name = "orchid_description")
    private String orchidDescription;

    @Column(name = "orchid_url", length = 1000)
    private String orchidUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

}