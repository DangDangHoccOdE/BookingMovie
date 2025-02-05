package org.example.movieservice.controller;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.example.movieservice.entity.Movie;
import org.example.movieservice.entity.dto.MovieRequestDto;
import org.example.movieservice.entity.dto.MovieResponseDto;
import org.example.movieservice.service.inter.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/movie/movies")
public class MovieController {
    private final MovieService movieService;

    @GetMapping("displayingMovies")
    public List<MovieResponseDto> getALlDisplayedMoviesInVision() {
        return movieService.getAllDisplayingMovieInVision();
    }

    @GetMapping("comingSoonMovies")
    public List<MovieResponseDto> getComingSoonMoviesInVision() {
        return movieService.getAllComingSoonMovies();
    }

    @GetMapping("{movieId}")
    public MovieResponseDto getMovieById(@PathVariable int movieId) {
        return movieService.getMovieByMovieId(movieId);
    }

    @PostMapping("add")
    @CircuitBreaker(name = "movie", fallbackMethod = "fallback")
    @Retry(name = "movie")
    public Movie addMovie(@RequestBody MovieRequestDto movieRequestDto) {
        return movieService.addMovie(movieRequestDto);
    }

    private Movie fallback(MovieRequestDto movieRequestDto, RuntimeException runtimeException) throws RuntimeException {
        return null;
    }

}

