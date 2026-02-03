package com.example.assignment2.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Table(name = "tag")
public class Tag {
    @Id
    @Column(name = "tag_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "tag_name", nullable = false)
    private String tagName;

    @Nationalized
    @Lob
    @Column(name = "note")
    private String note;

}