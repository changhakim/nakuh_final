package com.nakuh.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.domain.PostTag;
import com.nakuh.web.mapper.PostTagMapper;

@Service
public class PostTagServiceImpl implements PostTagService{

	@Autowired PostTagMapper posMap;

	@Override
	public void registPostTag(PostTag pos) {
		posMap.insertPostTag(pos);
		
	}

	@Override
	public List<PostTag> bringAllPostTagsList() {
		
		return posMap.selectAllPostTagsList();
	}

	@Override
	public List<PostTag> retrievePostTags(PostTag pt) {
		
		return posMap.selectPostTags(pt);
	}

	@Override
	public PostTag retrievePostTag(String artseq) {
		
		return posMap.selectPostTag(artseq);
	}

	@Override
	public int countPostTags() {
		int i = posMap.countPostTags();
		return i;
	}

	@Override
	public boolean existsPostTag(String searchWord) {
		boolean res = false;
		res = posMap.existsPostTag(searchWord);
		return res;
	}

	@Override
	public void modifyPostTag(PostTag pos) {
		posMap.updatePostTag(pos);
		
	}

	@Override
	public void removePostTag(PostTag pos) {
		posMap.deletePostTag(pos);
		
	}


}
