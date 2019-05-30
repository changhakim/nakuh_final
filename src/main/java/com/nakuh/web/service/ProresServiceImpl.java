package com.nakuh.web.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.domain.Prores;
import com.nakuh.web.mapper.ProresMapper;

@Service
public class ProresServiceImpl implements ProresService{

	@Autowired ProresMapper prrMap;
	@Override
	public void createProres(Prores param) {
		prrMap.insertProres(param);
	}

	@Override
	public List<Prores> findAllProres(HashMap<String, String> paramMap) {
		return prrMap.selectAllProres(paramMap);
	}

	@Override
	public List<Prores> findSomeProress(HashMap<String, String> paramMap) {
		return prrMap.selectSomeProress(paramMap);
	}

	@Override
	public Prores findProres(Prores param) {
		return prrMap.selectProres(param);
	}

	@Override
	public int countProres() {
		return prrMap.countProres();
	}

	@Override
	public void modifyProres(Prores param) {
		prrMap.updateProres(param);
	}

	@Override
	public void removeProres(Prores param) {
		prrMap.deleteProres(param);
	}

}
