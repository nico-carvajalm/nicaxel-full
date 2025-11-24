package com.nicaxel.cart_service.service;

import com.nicaxel.cart_service.dto.CartItemResponse;
import com.nicaxel.cart_service.dto.CartResponse;
import com.nicaxel.cart_service.dto.ProductDTO;
import com.nicaxel.cart_service.model.Cart;
import com.nicaxel.cart_service.model.CartItem;
import com.nicaxel.cart_service.repository.CartItemRepository;
import com.nicaxel.cart_service.repository.CartRepository;
//import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {


    private final CartRepository cartRepo;
    private final CartItemRepository itemRepo;
    private final RestTemplate restTemplate;

    public CartService(CartRepository cartRepo, CartItemRepository itemRepo, RestTemplate restTemplate) {
        this.cartRepo = cartRepo;
        this.itemRepo = itemRepo;
        this.restTemplate = restTemplate;
    }

    // Crear o obtener carrito
    public Cart getOrCreateCart(String email) {
        return cartRepo.findByUserEmail(email)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUserEmail(email);
                    return cartRepo.save(cart);
                });
    }

    // ======================================
    // DEVOLVER CARRITO COMPLETO
    // ======================================
    public CartResponse getCartResponse(String email) {
        Cart cart = getOrCreateCart(email);

        CartResponse response = new CartResponse();
        response.setCartId(cart.getId());
        response.setUserEmail(cart.getUserEmail());

        List<CartItemResponse> items = new ArrayList<>();

        String productServiceUrl = "http://backend:8080/api/products/";


        for (CartItem item : cart.getItems()) {

            ProductDTO product = restTemplate.getForObject(
                    productServiceUrl + item.getProductId(),
                    ProductDTO.class
            );

            CartItemResponse dto = new CartItemResponse();
            dto.setItemId(item.getId());
            dto.setProductId(item.getProductId());
            dto.setQuantity(item.getQuantity());

            if (product != null) {
                dto.setName(product.getName());
                dto.setBrand(product.getBrand());
                dto.setPrice(product.getPrice());
                dto.setFinalPrice(product.getFinalPrice());
                dto.setImageUrl(product.getImageUrl());
            }

            items.add(dto);
        }

        response.setItems(items);
        return response;
    }

    // Agregar producto al carrito
    public Cart addItem(String email, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(email);

        CartItem existing = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + quantity);
            itemRepo.save(existing);
        } else {
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProductId(productId);
            item.setQuantity(quantity);
            itemRepo.save(item);
            cart.getItems().add(item);
        }

        return cartRepo.save(cart);
    }

    public void removeItem(Long cartId, Long itemId) {
        itemRepo.deleteById(itemId);
    }

    public void clearCart(Long cartId) {
        Cart cart = cartRepo.findById(cartId)
                .orElseThrow(() -> new RuntimeException("El carrito no existe"));

        cart.getItems().clear();
        cartRepo.save(cart);
    }
}
