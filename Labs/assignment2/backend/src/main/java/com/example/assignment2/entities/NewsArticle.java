package com.example.assignment2.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "news_article")
public class NewsArticle {
    @Id
    @Column(name = "news_article_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "news_title", nullable = false, length = 500)
    private String newsTitle;

    @Nationalized
    @Column(name = "headline", length = 500)
    private String headline;

    @ColumnDefault("getdate()")
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    @Nationalized
    @Lob
    @Column(name = "news_content", nullable = false)
    private String newsContent;

    @Nationalized
    @Column(name = "news_source")
    private String newsSource;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ColumnDefault("1")
    @Column(name = "news_status", nullable = false)
    private Boolean newsStatus = false;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by_id", nullable = false)
    private SystemAccount createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by_id")
    private SystemAccount updatedBy;

    @Column(name = "modified_date")
    private Instant modifiedDate;

}