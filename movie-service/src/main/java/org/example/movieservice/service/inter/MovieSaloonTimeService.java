package org.example.movieservice.service.inter;

import org.example.movieservice.entity.MovieSaloonTime;

import java.util.List;

public interface MovieSaloonTimeService {
    List<MovieSaloonTime> getMovieSaloonTimeAndMovieId(int saloonId, int movieId);
}
