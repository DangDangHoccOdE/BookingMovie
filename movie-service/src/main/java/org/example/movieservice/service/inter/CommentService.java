package org.example.movieservice.service.inter;

import org.example.movieservice.entity.Comment;
import org.example.movieservice.entity.dto.CommentRequestDto;
import org.example.movieservice.entity.dto.DeleteCommentRequestDto;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsByMovieId(int movieId, int page, int size);
    void deleteComment(DeleteCommentRequestDto deleteCommentRequestDto);
    Comment addComment(CommentRequestDto commentRequestDto);
    int getNumberOfCommentsByMovieId(int movieId);
}
