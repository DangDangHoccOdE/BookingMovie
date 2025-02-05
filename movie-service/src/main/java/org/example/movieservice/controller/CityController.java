package org.example.movieservice.controller;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.example.movieservice.entity.City;
import org.example.movieservice.entity.dto.CityRequestDto;
import org.example.movieservice.service.inter.CityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movie/cities")
@RequiredArgsConstructor
public class CityController {
    private final CityService cityService;

    @GetMapping("getCitiesByMovieId/{movieId}")
    public List<City> getCitiesByMovieId(@PathVariable int movieId) {
        return cityService.findCitiesByMovieId(movieId);
    }

    @GetMapping("all")
    public List<City> getAll(){
        return cityService.findAll();
    }

    @PostMapping("/add")
    @CircuitBreaker(name = "city", fallbackMethod = "fallback")
    @Retry(name = "city")
    public void add(@RequestBody CityRequestDto city) {
        cityService.add(city);
    }

    private void fallback(CityRequestDto cityRequestDto, RuntimeException runtimeException) {}
}
