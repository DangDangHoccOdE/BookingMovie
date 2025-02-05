package org.example.movieservice.service.inter;

import org.example.movieservice.entity.Director;
import org.example.movieservice.entity.dto.DirectorRequestDto;

import java.util.List;

public interface DirectorService {
    List<Director> getAllDirectors();
    Director getDirectorById(int id);
    Director addDirector(DirectorRequestDto directorRequestDto);
}
