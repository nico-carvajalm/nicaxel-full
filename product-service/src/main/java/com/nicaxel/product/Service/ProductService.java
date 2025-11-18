package com.nicaxel.product.Service;

import com.nicaxel.product.Model.Product;
import com.nicaxel.product.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public Optional<Product> getById(Long id) {
        return repo.findById(id);
    }

    public Product create(Product p) {
        return repo.save(p);
    }

    public Optional<Product> update(Long id, Product p) {
        return repo.findById(id).map(existing -> {
            existing.setName(p.getName());
            existing.setBrand(p.getBrand());
            existing.setStock(p.getStock());
            existing.setPrice(p.getPrice());
            existing.setImageUrl(p.getImageUrl());
            return repo.save(existing);
        });
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
