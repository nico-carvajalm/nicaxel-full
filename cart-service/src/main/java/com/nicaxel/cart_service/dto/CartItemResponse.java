package com.nicaxel.cart_service.dto;

public class CartItemResponse {

    private Long itemId;
    private Long productId;
    private String name;
    private String brand;
    private Integer price;
    private Integer finalPrice;
    private String imageUrl;
    private Integer quantity;

    // Getters y setters
    public Long getItemId() {
        return itemId;
    }
    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }
    public Long getProductId() {
        return productId;
    }
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
    public Integer getPrice() {
        return price;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
    public Integer getFinalPrice() {
        return finalPrice;
    }
    public void setFinalPrice(Integer finalPrice) {
        this.finalPrice = finalPrice;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
}
