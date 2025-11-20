package com.nicaxel.product.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nicaxel.product.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
