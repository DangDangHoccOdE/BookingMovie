package org.example.movieservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.dao.CategoryDao;
import org.example.movieservice.dao.MovieDao;
import org.example.movieservice.entity.Category;
import org.example.movieservice.entity.Director;
import org.example.movieservice.entity.Movie;
import org.example.movieservice.entity.dto.MovieRequestDto;
import org.example.movieservice.entity.dto.MovieResponseDto;
import org.example.movieservice.service.inter.CategoryService;
import org.example.movieservice.service.inter.DirectorService;
import org.example.movieservice.service.inter.MovieService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {
    private final MovieDao movieDao;
    private final CategoryService categoryService;
    private final DirectorService directorService;
    private final WebClient.Builder clientBuilder;

    @Cacheable(value = "displaying_movies")
    @Override
    public List<MovieResponseDto> getAllDisplayingMovieInVision() {
        return movieDao.getAllDisplayingMovieInVision();
    }

    @Cacheable(value = "comingSoon_movies")
    @Override
    public List<MovieResponseDto> getAllComingSoonMovies() {
        return movieDao.getAllComingSoonMovie();
    }

    @Override
    public MovieResponseDto getMovieByMovieId(int movieId) {
        return movieDao.getMovieById(movieId);
    }

    @Override
    public Movie getMovieById(int movieId) {
        return movieDao.getMovieByMovieId(movieId);
    }

    @CacheEvict(value = "comingSoonMovie",allEntries = true)
    @Override
    public Movie addMovie(MovieRequestDto movieRequestDto) {
        Boolean result = clientBuilder.build().get()
                .uri("http://USERSERVICE/api/user/users/isUserAdmin")
                .header("Authorization","Bearer " + movieRequestDto.getUserAccessToken())
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();

        if(result){
            Category category = categoryService.getCategoryById(movieRequestDto.getCategoryId());
            Director director = directorService.getDirectorById(movieRequestDto.getDirectorId());

            Movie movie = Movie.builder()
                    .movieName(movieRequestDto.getMovieName())
                    .description(movieRequestDto.getDescription())
                    .duration(movieRequestDto.getDuration())
                    .releaseDate(movieRequestDto.getReleaseDate())
                    .movieTrailerUrl(movieRequestDto.getTrailerUrl())
                    .category(category)
                    .director(director)
                    .isDisplay(movieRequestDto.isInVision())
                    .build();
            return movieDao.save(movie);
        }
        throw new RuntimeException("Forbidden");
    }
}
