package com.nakuh.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.domain.Follower;
import com.nakuh.web.mapper.FollowerMapper;

@Service
public class FollowerServiceImpl implements FollowerService{

	@Autowired FollowerMapper folMap;
	
	@Override
	public void registFollower(Follower fol) {
		folMap.insertFollower(fol);
		
	}

	@Override
	public List<Follower> bringAllFollowersList(String fid) {
		
		return folMap.selectAllFollowersList(fid);
	}

	@Override
	public List<Follower> retrieveFollowers(String fid) {
		
		return folMap.selectFollowers(fid);
	}

	@Override
	public List<Follower> retrieveFollower(Follower fol) {
		
		return folMap.selectFollower(fol);
	}

	@Override
	public int countFollowers() {
		int i = folMap.countFollowers();
		return i;
	}

	@Override
	public boolean existsFollower(String searchWord) {
		boolean res = false;
		res = folMap.existsFollower(searchWord);
		return res;
	}

	@Override
	public void modifyFollower(Follower fol) {
		folMap.updateFollower(fol);
		
	}

	@Override
	public void removeFollower(Follower fol) {
		folMap.deleteFollower(fol);
		
	}

	@Override
	public List<Follower> retrieveFollowing(String fid) {
		return folMap.selectFollowing(fid);
	}

}
