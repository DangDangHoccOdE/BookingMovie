package org.example.movieservice.controller;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.example.movieservice.entity.Comment;
import org.example.movieservice.entity.dto.CommentRequestDto;
import org.example.movieservice.service.inter.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/movie/comments/")
public class CommentController {
    private final CommentService commentService;

    @GetMapping("getCommentsByMovieId/{movieId}/{pageNo}/{pageSize}")
    public List<Comment> getCommentsByMovieId(@PathVariable int movieId, @PathVariable int pageNo, @PathVariable int pageSize) {
        return commentService.getCommentsByMovieId(movieId, pageNo, pageSize);
    }

    @GetMapping("getCountOfComments/{movieId}")
    public int getNumberOfCommentsMovieId(@PathVariable int movieId) {
        return commentService.getNumberOfCommentsByMovieId(movieId);
    }

    @PostMapping("add")
    @CircuitBreaker(name = "comment", fallbackMethod = "fallback")
    @Retry(name = "comment")
    public Comment addComment(@RequestBody CommentRequestDto commentRequestDto) {
        return commentService.addComment(commentRequestDto);
    }
}
