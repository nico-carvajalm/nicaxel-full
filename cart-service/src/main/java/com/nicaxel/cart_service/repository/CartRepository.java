package com.nicaxel.cart_service.repository;

import com.nicaxel.cart_service.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserEmail(String userEmail);

}
