package com.nakuh.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.nakuh.web.domain.Follower;

@Repository
public interface FollowerMapper {
	public void insertFollower(Follower fol);
	
	public List<Follower> selectAllFollowersList(String fod);
	public List<Follower> selectFollowers(String fod);
	public List<Follower> selectFollowing(String fod);
	public List<Follower> selectFollower(Follower fol);
	public int countFollowers();
	public boolean existsFollower(String searchWord);
	public void updateFollower(Follower fol);
	public void deleteFollower(Follower fol);
}
