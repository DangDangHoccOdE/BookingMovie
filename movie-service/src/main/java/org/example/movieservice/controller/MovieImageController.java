package org.example.movieservice.controller;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.example.movieservice.entity.dto.ImageRequestDto;
import org.example.movieservice.service.impl.MovieImageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/movie/images")
@RequiredArgsConstructor
public class MovieImageController {
    private final MovieImageService movieImageService;

    @PostMapping("add")
    @CircuitBreaker(name = "image",fallbackMethod = "fallback")
    @Retry(name = "image")
    public void add(@RequestBody ImageRequestDto imageRequestDto){
        movieImageService.addMovieImage(imageRequestDto);
    }

    private void fallback(ImageRequestDto imageRequestDto, RuntimeException runtimeException){}
}
