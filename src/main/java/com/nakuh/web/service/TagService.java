package com.nakuh.web.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.nakuh.web.domain.Tag;

@Component
public interface TagService {
	public void registTag(Tag tag);
	
	public List<Tag> bringAllTagsList();
	public List<Tag> retrieveTags();
	public Tag retrieveTag(String searchWord);
	public int countTags();
	public boolean existsTag(String searchWord);
	
	public void modifyTag(Tag tag);
	public void removeTag(Tag tag);
}
