package com.nicaxel.cart_service.repository;

import com.nicaxel.cart_service.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
