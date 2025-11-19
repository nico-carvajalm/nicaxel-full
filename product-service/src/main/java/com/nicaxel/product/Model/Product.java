package com.nicaxel.product.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;        
    private String brand;       
    private Integer stock;      
    private Integer price;      
    private String imageUrl;    

}
