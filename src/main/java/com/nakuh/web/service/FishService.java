package com.nakuh.web.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.nakuh.web.domain.Fish;

@Component
public interface FishService {
	public void registFish(Fish fis);
	
	public List<Fish> bringAllFishsList();
	public List<Fish> retrieveFishs();
	public Fish retrieveFish(String searchWord);
	public int countFishs();
	public boolean existsFish(String searchWord);
	
	public void modifyFish(Fish fis);
	public void removeFish(Fish fis);
}
