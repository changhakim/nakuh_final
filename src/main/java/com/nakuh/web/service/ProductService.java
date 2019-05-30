package com.nakuh.web.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.nakuh.web.domain.Product;

@Component
public interface ProductService {
	public void createProduct(Product param);
	public List<Product> findAllProduct();
	public List<Product> findCateProducts(Product param);
	public List<Product> findSomeProducts(Product param);
	public HashMap<String, Object> findProduct(Product param);
	public int countProduct();
	public void modifyProduct(Product param);
	public void removeProduct(Product param);
}
