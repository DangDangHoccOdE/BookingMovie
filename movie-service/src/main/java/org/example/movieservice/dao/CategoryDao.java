package org.example.movieservice.dao;

import org.example.movieservice.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDao extends JpaRepository<Category, Integer> {
    Category getCategoryByCategoryId(int categoryId);
}
