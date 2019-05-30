package com.nakuh.web.mapper;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.nakuh.web.domain.Product;

@Repository
public interface ProductMapper {
	public void insertProduct(Product param);
	public List<Product> selectAllProduct();
	public List<Product> selectCateProducts(Product param);
	public List<Product> selectSomeProducts(Product param);
	public List<Product> selectProducts(Product param);
	public Product selectProduct(Product param);
	public int countProduct();
	public void updateProduct(Product param);
	public void deleteProduct(Product param);
}
