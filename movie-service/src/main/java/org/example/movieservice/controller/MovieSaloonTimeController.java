package org.example.movieservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.entity.MovieSaloonTime;
import org.example.movieservice.service.inter.MovieSaloonTimeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movie/movieSaloonTimes/")
public class MovieSaloonTimeController {
    private final MovieSaloonTimeService movieSaloonTimeService;

    @GetMapping("getMovieSaloonTimeSaloonAndMovieId/{saloonId}/{movieId}")
    public List<MovieSaloonTime> getMovieSaloonTimeSaloonAndMovieId(@PathVariable int saloonId, @PathVariable int movieId){
        return movieSaloonTimeService.getMovieSaloonTimeAndMovieId(saloonId, movieId);
    }
}
