package org.example.movieservice.service.inter;

import org.example.movieservice.entity.Actor;
import org.example.movieservice.entity.dto.ActorRequestDto;

import java.util.List;

public interface ActorService {
    List<Actor> getActorsByMovieId(int movieId);
    List<Actor> getAllActors();
    void addActor(ActorRequestDto actorRequestDto);
}
