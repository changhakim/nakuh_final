package com.nakuh.web.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Component;

import com.nakuh.web.domain.Prores;

@Component
public interface ProresService {
	public void createProres(Prores param);
	public List<Prores> findAllProres(HashMap<String, String> paramMap);
	public List<Prores> findSomeProress(HashMap<String, String> paramMap);
	public Prores findProres(Prores param);
	public int countProres();
	public void modifyProres(Prores param);
	public void removeProres(Prores param);
}
