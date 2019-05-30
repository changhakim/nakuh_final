package com.nakuh.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.nakuh.web.domain.Fish;

@Repository
public interface FishMapper {
	public void insertFish(Fish fis);
	
	public List<Fish> selectAllFishsList();
	public List<Fish> selectFishs();
	public Fish selectFish(String searchWord);
	public int countFishs();
	public boolean existsFish(String searchWord);
	
	public void updateFish(Fish fis);
	public void deleteFish(Fish fis);
}
