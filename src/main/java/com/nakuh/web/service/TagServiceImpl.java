package com.nakuh.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.domain.Tag;
import com.nakuh.web.mapper.TagMapper;

@Service
public class TagServiceImpl implements TagMapper{

	@Autowired TagMapper tagMap;
	
	@Override
	public void insertTag(Tag tag) {
		tagMap.insertTag(tag);
		
	}

	@Override
	public List<Tag> selectAllTagsList() {
		
		return tagMap.selectAllTagsList();
	}

	@Override
	public List<Tag> selectTags() {
		
		return tagMap.selectAllTagsList();
	}

	@Override
	public Tag selectTag(String searchWord) {
		
		return tagMap.selectTag(searchWord);
	}

	@Override
	public int countTags() {
		int i = tagMap.countTags();
		return i;
	}

	@Override
	public boolean existsTag(String searchWord) {
		boolean res = false;
		res = tagMap.existsTag(searchWord);
		return res;
	}

	@Override
	public void updateTag(Tag tag) {
		tagMap.updateTag(tag);
		
	}

	@Override
	public void deleteTag(Tag tag) {
		tagMap.deleteTag(tag);
		
	}

}
