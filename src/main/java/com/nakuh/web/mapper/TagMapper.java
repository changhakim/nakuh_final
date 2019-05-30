package com.nakuh.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.nakuh.web.domain.Tag;

@Repository
public interface TagMapper {
	public void insertTag(Tag tag);
	
	public List<Tag> selectAllTagsList();
	public List<Tag> selectTags();
	public Tag selectTag(String searchWord);
	public int countTags();
	public boolean existsTag(String searchWord);
	
	public void updateTag(Tag tag);
	public void deleteTag(Tag tag);
}
