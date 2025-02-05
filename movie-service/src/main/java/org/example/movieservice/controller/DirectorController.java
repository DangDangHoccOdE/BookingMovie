package org.example.movieservice.controller;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.example.movieservice.entity.Director;
import org.example.movieservice.entity.dto.DirectorRequestDto;
import org.example.movieservice.service.inter.DirectorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movie/directors")
@RequiredArgsConstructor
public class DirectorController {
    private final DirectorService directorService;

    @GetMapping("/getall")
    public List<Director> getAll() {
        return directorService.getAllDirectors();
    }

    @PostMapping("add")
    @CircuitBreaker(name = "director", fallbackMethod = "fallback")
    @Retry(name = "director")
    public Director add(@RequestBody DirectorRequestDto director) {
        return directorService.addDirector(director);
    }

    private Director fallback(DirectorRequestDto directorRequestDto, RuntimeException runtimeException) {
        return null;
    }
}
