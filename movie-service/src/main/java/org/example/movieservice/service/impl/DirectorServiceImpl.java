package org.example.movieservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.dao.DirectorDao;
import org.example.movieservice.entity.Director;
import org.example.movieservice.entity.dto.DirectorRequestDto;
import org.example.movieservice.service.inter.DirectorService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DirectorServiceImpl implements DirectorService {
    private final DirectorDao directorDao;
    private final WebClient.Builder clientBuilder;

    @Cacheable(value = "directors")
    @Override
    public List<Director> getAllDirectors() {
        return directorDao.findAll(Sort.by(Sort.Direction.ASC, "directorName"));
    }

    @Override
    public Director getDirectorById(int id) {
        return directorDao.getDirectorByDirectorId(id);
    }

    @CacheEvict(value = "directors",allEntries = true)
    @Override
    public Director addDirector(DirectorRequestDto directorRequestDto) {
        Boolean result = clientBuilder.build().get()
                .uri("http://USERSERVICE/api/user/users/isUserAdmin")
                .retrieve().bodyToMono(Boolean.class)
                .block();

        if(result){
            Director director = Director.builder()
                    .directorName(directorRequestDto.getDirectorName())
                    .build();
            return directorDao.save(director);
        }
        throw new RuntimeException("Forbidden!");
    }
}
