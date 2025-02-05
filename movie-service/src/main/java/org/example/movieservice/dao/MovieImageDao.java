package org.example.movieservice.dao;

import org.example.movieservice.entity.MovieImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieImageDao extends JpaRepository<MovieImage, Integer> {
}
