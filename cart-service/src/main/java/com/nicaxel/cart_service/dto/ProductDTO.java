package com.nicaxel.cart_service.dto;

public class ProductDTO {
    private Long id;
    private String name;
    private String brand;
    private Integer price;
    private Integer finalPrice;
    private String imageUrl;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }

    public Integer getFinalPrice() { return finalPrice; }
    public void setFinalPrice(Integer finalPrice) { this.finalPrice = finalPrice; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
