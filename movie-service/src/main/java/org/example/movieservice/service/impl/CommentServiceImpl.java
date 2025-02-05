package org.example.movieservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.dao.CommentDao;
import org.example.movieservice.entity.Comment;
import org.example.movieservice.entity.Movie;
import org.example.movieservice.entity.dto.CommentRequestDto;
import org.example.movieservice.entity.dto.DeleteCommentRequestDto;
import org.example.movieservice.service.inter.CommentService;
import org.example.movieservice.service.inter.MovieService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentDao commentDao;
    private final MovieService movieService;
    private final WebClient.Builder clientBuilder;

    @Override
    public List<Comment> getCommentsByMovieId(int movieId, int page, int size) {
        Pageable pageable = PageRequest.of(page-1,size);
        return commentDao.getCommentByMovieMovieId(movieId,pageable);
    }

    @Override
    public void deleteComment(DeleteCommentRequestDto deleteCommentRequestDto) {
        Boolean result = clientBuilder.build().get()
                .uri("http://USERSERVICE/api/user/users/isUserCustomer")
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();

        if(result){
            commentDao.deleteById(deleteCommentRequestDto.getCommentId());
        }
    }

    @Override
    public Comment addComment(CommentRequestDto commentRequestDto) {
        Boolean result = clientBuilder.build().get()
                .uri("http://USERSERVICE/api/user/users/isUserCustomer")
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();

        if(result){
            Movie movie = movieService.getMovieById(commentRequestDto.getMovieId());

            Comment comment = Comment.builder()
                    .commentByUserId(commentRequestDto.getCommentByUserId())
                    .commentBy(commentRequestDto.getCommentBy())
                    .commentText(commentRequestDto.getCommentText())
                    .movie(movie)
                    .build();

            return commentDao.save(comment);
        }
        throw new RuntimeException("Forbidden!");
    }

    @Override
    public int getNumberOfCommentsByMovieId(int movieId) {
        return commentDao.countCommentByMovieMovieId(movieId);
    }
}
