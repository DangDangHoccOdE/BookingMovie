package org.example.movieservice.service.inter;

import org.example.movieservice.entity.MovieImage;
import org.example.movieservice.entity.dto.ImageRequestDto;

public interface MovieImageServices {
    MovieImage addMovieImage(ImageRequestDto imageRequestDto);
}
