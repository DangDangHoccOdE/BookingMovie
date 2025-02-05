package org.example.movieservice.controller;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.example.movieservice.entity.Actor;
import org.example.movieservice.entity.dto.ActorRequestDto;
import org.example.movieservice.service.inter.ActorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movie/actors")
@RequiredArgsConstructor
public class ActorController {
    private final ActorService actorService;

    @GetMapping("getActorsByMovieId/{movieId}")
    public List<Actor> getActorsByMovieId(@PathVariable int movieId) {
        return actorService.getActorsByMovieId(movieId);
    }

    @GetMapping("getall")
    public List<Actor> getAllActors() {
        return actorService.getAllActors();
    }

    @PostMapping("add")
    @CircuitBreaker(name = "actor",fallbackMethod = "fallback")
    @Retry(name = "actor")
    public void addActor(@RequestBody ActorRequestDto actor) {
        actorService.addActor(actor);
    }

    private void fallback(ActorRequestDto actorRequestDto, RuntimeException runtimeException) {}
}
