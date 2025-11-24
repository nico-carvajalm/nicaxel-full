package com.nicaxel.cart_service.controller;

import com.nicaxel.cart_service.dto.CartResponse;
import com.nicaxel.cart_service.model.Cart;
import com.nicaxel.cart_service.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @GetMapping("/{email}")
    public CartResponse getCart(@PathVariable String email) {
        return service.getCartResponse(email);
    }

    @PostMapping("/add")
    public Cart addItem(
            @RequestParam String email,
            @RequestParam Long productId,
            @RequestParam Integer quantity
    ) {
        return service.addItem(email, productId, quantity);
    }

    @DeleteMapping("/{cartId}/item/{itemId}")
    public void removeItem(@PathVariable Long cartId, @PathVariable Long itemId) {
        service.removeItem(cartId, itemId);
    }

    @DeleteMapping("/{cartId}/clear")
    public void clearCart(@PathVariable Long cartId) {
        service.clearCart(cartId);
    }
}
