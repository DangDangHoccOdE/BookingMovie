package org.example.movieservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.dao.MovieImageDao;
import org.example.movieservice.entity.Movie;
import org.example.movieservice.entity.MovieImage;
import org.example.movieservice.entity.dto.ImageRequestDto;
import org.example.movieservice.service.inter.MovieImageServices;
import org.example.movieservice.service.inter.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class MovieImageService implements MovieImageServices {
    private final MovieImageDao movieImageDao;
    private final MovieService movieService;
    private final WebClient.Builder clientBuilder;

    @Override
    public MovieImage addMovieImage(ImageRequestDto imageRequestDto) {
        Boolean result = clientBuilder.build().get()
                .uri("http://USERSERVICE/api/user/users/isUserAdmin")
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();

        if(result){
            Movie movie = movieService.getMovieById(imageRequestDto.getMovieId());

            MovieImage movieImage = new MovieImage();
            movieImage.setImageUrl(imageRequestDto.getImageUrl());
            movieImage.setMovie(movie);
            return movieImageDao.save(movieImage);
        }
        throw new RuntimeException("Forbidden");
    }
}
