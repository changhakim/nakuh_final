package com.nakuh.web.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.domain.Product;
import com.nakuh.web.mapper.ProductMapper;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired ProductMapper proMap;
	@Autowired HashMap<String, Object> map;
	@Override
	public void createProduct(Product param) {
		proMap.insertProduct(param);
	}

	@Override
	public List<Product> findAllProduct() {
		return proMap.selectAllProduct();
	}

	@Override
	public List<Product> findCateProducts(Product param){
		return proMap.selectCateProducts(param);
	}
	
	@Override
	public List<Product> findSomeProducts(Product param) {
		return proMap.selectSomeProducts(param);
	}

	@Override
	public HashMap<String, Object> findProduct(Product param) {
		map.put("prolist", proMap.selectProducts(param));
		map.put("product", proMap.selectProduct(param));
		return map;
	}

	@Override
	public int countProduct() {
		return proMap.countProduct();
	}

	@Override
	public void modifyProduct(Product param) {
		proMap.updateProduct(param);
	}

	@Override
	public void removeProduct(Product param) {
		proMap.deleteProduct(param);
	}

}
