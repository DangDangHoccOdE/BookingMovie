package org.example.movieservice.service.inter;

import org.example.movieservice.entity.Movie;
import org.example.movieservice.entity.dto.MovieRequestDto;
import org.example.movieservice.entity.dto.MovieResponseDto;

import java.util.List;

public interface MovieService {
    List<MovieResponseDto> getAllDisplayingMovieInVision();
    List<MovieResponseDto> getAllComingSoonMovies();
    MovieResponseDto getMovieByMovieId(int movieId);
    Movie getMovieById(int movieId);
    Movie addMovie(MovieRequestDto movieRequestDto);
}
