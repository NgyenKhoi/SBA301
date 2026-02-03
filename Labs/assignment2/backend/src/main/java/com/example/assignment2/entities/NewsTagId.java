package com.example.assignment2.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class NewsTagId implements Serializable {
    private static final long serialVersionUID = 3471411296201372812L;
    @Column(name = "news_article_id", nullable = false)
    private Integer newsArticleId;

    @Column(name = "tag_id", nullable = false)
    private Integer tagId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        NewsTagId entity = (NewsTagId) o;
        return Objects.equals(this.newsArticleId, entity.newsArticleId) &&
                Objects.equals(this.tagId, entity.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(newsArticleId, tagId);
    }

}