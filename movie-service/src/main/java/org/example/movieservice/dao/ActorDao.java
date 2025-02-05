package org.example.movieservice.dao;

import org.example.movieservice.entity.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActorDao extends JpaRepository<Actor, Integer> {
    List<Actor> getActorByMovieMovieId(int movieId);
}
