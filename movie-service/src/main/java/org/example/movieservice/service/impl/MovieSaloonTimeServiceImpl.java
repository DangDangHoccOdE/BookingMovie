package org.example.movieservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.dao.MovieSaloonTimeDao;
import org.example.movieservice.entity.MovieSaloonTime;
import org.example.movieservice.service.inter.MovieSaloonTimeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieSaloonTimeServiceImpl implements MovieSaloonTimeService {
    private final MovieSaloonTimeDao movieSaloonTimeDao;

    @Override
    public List<MovieSaloonTime> getMovieSaloonTimeAndMovieId(int saloonId, int movieId) {
        return movieSaloonTimeDao.getMovieSaloonTimeBySaloonSaloonIdAndMovieMovieId(saloonId, movieId);
    }
}
