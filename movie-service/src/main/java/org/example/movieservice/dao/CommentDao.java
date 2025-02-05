package org.example.movieservice.dao;

import org.example.movieservice.entity.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentDao extends JpaRepository<Comment, Integer> {
    List<Comment> getCommentByMovieMovieId(int movieId, Pageable pageable);
    int countCommentByMovieMovieId(int movieId);
}
