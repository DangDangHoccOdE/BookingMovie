package org.example.movieservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.dao.CategoryDao;
import org.example.movieservice.entity.Category;
import org.example.movieservice.service.inter.CategoryService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDao categoryDao;

    @Cacheable(value = "categories")
    @Override
    public List<Category> findAll() {
        return categoryDao.findAll(Sort.by(Sort.Direction.ASC, "categoryName"));
    }

    @Override
    public Category getCategoryById(int id) {
        return categoryDao.getCategoryByCategoryId(id);
    }
}
