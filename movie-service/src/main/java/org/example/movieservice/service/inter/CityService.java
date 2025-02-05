package org.example.movieservice.service.inter;

import org.example.movieservice.entity.City;
import org.example.movieservice.entity.dto.CityRequestDto;

import java.util.List;

public interface CityService {
    List<City> findAll();
    List<City> findCitiesByMovieId(int movieId);
    void add(CityRequestDto cityRequestDto);
}
