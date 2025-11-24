package com.nicaxel.cart_service.dto;

import java.util.List;

public class CartResponse {

    private Long cartId;
    private String userEmail;
    private List<CartItemResponse> items;

    // Getters y setters
    public Long getCartId() {
        return cartId;
    }
    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }
    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public List<CartItemResponse> getItems() {
        return items;
    }
    public void setItems(List<CartItemResponse> items) {
        this.items = items;
    }
    
}
