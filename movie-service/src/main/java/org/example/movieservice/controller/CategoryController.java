package org.example.movieservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.movieservice.entity.Category;
import org.example.movieservice.service.inter.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movie/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("getall")
    public List<Category> getAll(){
        return categoryService.findAll();
    }
}
