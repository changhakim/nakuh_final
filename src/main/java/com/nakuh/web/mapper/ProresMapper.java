package com.nakuh.web.mapper;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.nakuh.web.domain.Prores;

@Repository
public interface ProresMapper {
	public void insertProres(Prores param);
	public List<Prores> selectAllProres(HashMap<String, String> paramMap);
	public List<Prores> selectSomeProress(HashMap<String, String> paramMap);
	public Prores selectProres(Prores param);
	public int countProres();
	public void updateProres(Prores param);
	public void deleteProres(Prores param);
}
