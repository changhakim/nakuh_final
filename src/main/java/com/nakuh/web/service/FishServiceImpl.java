package com.nakuh.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.domain.Fish;
import com.nakuh.web.mapper.FishMapper;

@Service
public class FishServiceImpl implements FishService{

	@Autowired FishMapper fisMap;
	
	@Override
	public void registFish(Fish fis) {
		fisMap.insertFish(fis);
		
	}

	@Override
	public List<Fish> bringAllFishsList() {
		
		return fisMap.selectAllFishsList();
	}

	@Override
	public List<Fish> retrieveFishs() {
		
		return fisMap.selectFishs();
	}

	@Override
	public Fish retrieveFish(String searchWord) {
		
		return fisMap.selectFish(searchWord);
	}

	@Override
	public int countFishs() {
		int i = fisMap.countFishs();
		return i;
	}

	@Override
	public boolean existsFish(String searchWord) {
		boolean res = false;
		res = fisMap.existsFish(searchWord);
		return res;
	}

	@Override
	public void modifyFish(Fish fis) {
		fisMap.updateFish(fis);
		
	}

	@Override
	public void removeFish(Fish fis) {
		fisMap.deleteFish(fis);
		
	}

}
