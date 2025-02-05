package org.example.movieservice.dao;

import org.example.movieservice.entity.Director;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectorDao extends JpaRepository<Director, Integer> {
    Director getDirectorByDirectorId(int id);
}
