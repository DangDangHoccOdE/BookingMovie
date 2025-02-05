package org.example.movieservice.dao;

import org.example.movieservice.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityDao extends JpaRepository<City, Integer> {
    List<City> getCitiesByMovieMovieId(int movieId);
}
