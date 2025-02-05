package org.example.movieservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.dao.CityDao;
import org.example.movieservice.entity.City;
import org.example.movieservice.entity.Movie;
import org.example.movieservice.entity.dto.CityRequestDto;
import org.example.movieservice.service.inter.CityService;
import org.example.movieservice.service.inter.MovieService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {
    private final CityDao cityDao;
    private final MovieService movieService;
    private final WebClient.Builder webClientBuilder;

    @Cacheable(value = "cities")
    @Override
    public List<City> findAll() {
        return cityDao.findAll(Sort.by(Sort.Direction.ASC, "cityName"));
    }

    @Override
    public List<City> findCitiesByMovieId(int movieId) {
        return cityDao.getCitiesByMovieMovieId(movieId);
    }

    @CacheEvict(value = "cities", allEntries = true)
    @Override
    public void add(CityRequestDto cityRequestDto) {
        Boolean result = webClientBuilder.build().get()
                .uri("http://USERSERVICE/api/user/users/isUserAdmin")
                .header("Authorization","Bearer "+cityRequestDto.getToken())
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();

        if(result){
            Movie movie = movieService.getMovieById(cityRequestDto.getMovieId());
            for(String cityName: cityRequestDto.getCityNameList()){
                City city = City.builder()
                        .cityName(cityName)
                        .movie(movie)
                        .build();
                cityDao.save(city);
            }
        }
    }
}
