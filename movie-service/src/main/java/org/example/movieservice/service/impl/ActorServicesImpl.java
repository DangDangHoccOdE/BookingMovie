package org.example.movieservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.dao.ActorDao;
import org.example.movieservice.entity.Actor;
import org.example.movieservice.entity.Movie;
import org.example.movieservice.entity.dto.ActorRequestDto;
import org.example.movieservice.service.inter.ActorService;
import org.example.movieservice.service.inter.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActorServicesImpl implements ActorService {
    private final ActorDao actorDao;
    private final MovieService movieService;
    private final WebClient.Builder webClient;

    @Override
    public List<Actor> getActorsByMovieId(int movieId) {
        return actorDao.getActorByMovieMovieId(movieId);
    }

    @Cacheable(value = "actors")
    @Override
    public List<Actor> getAllActors() {
        return actorDao.findAll(Sort.by(Sort.Direction.ASC, "actorName"));
    }

    @CacheEvict(value = "actors", allEntries = true)
    @Override
    public void addActor(ActorRequestDto actorRequestDto) {
        Boolean result = webClient.build().get()
                .uri("http://USERSERVICE/api/user/users/isUserAdmin")
                .header("Authorization","Bearer " + actorRequestDto.getToken())
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();

        if(result) {
            Movie movie = movieService.getMovieById(actorRequestDto.getMovieId());

            for (String actorName : actorRequestDto.getActorNameList()) {
                Actor actor = Actor.builder()
                        .actorName(actorName)
                        .movie(movie).build();
                actorDao.save(actor);
            }
        }
    }
}
