package com.nicaxel.product.controller;

import com.nicaxel.product.models.Product;
import com.nicaxel.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
@Tag(name = "Products", description = "Gestión de productos Nicaxel")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Listar productos")
    public List<Product> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID")
    public Product getById(@PathVariable Long id) {
        return service.getById(id).orElse(null);
    }

    @PostMapping
    @Operation(summary = "Crear producto")
    public Product create(@RequestBody Product p) {
        return service.create(p);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto")
    public Product update(@PathVariable Long id, @RequestBody Product p) {
        return service.update(id, p).orElse(null);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar producto")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
