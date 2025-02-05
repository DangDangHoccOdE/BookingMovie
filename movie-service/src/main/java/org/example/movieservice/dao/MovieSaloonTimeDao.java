package org.example.movieservice.dao;

import org.example.movieservice.entity.MovieSaloonTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieSaloonTimeDao extends JpaRepository<MovieSaloonTime, Integer> {
    List<MovieSaloonTime> getMovieSaloonTimeBySaloonSaloonIdAndMovieMovieId(Integer saloonId, Integer movieId);
}
