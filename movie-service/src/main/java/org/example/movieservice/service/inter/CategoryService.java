package org.example.movieservice.service.inter;

import org.example.movieservice.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> findAll();
    Category getCategoryById(int id);
}
