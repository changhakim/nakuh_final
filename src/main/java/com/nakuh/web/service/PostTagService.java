package com.nakuh.web.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.nakuh.web.domain.PostTag;

@Component
public interface PostTagService {
	
	public void registPostTag(PostTag pos);
	
	public List<PostTag> bringAllPostTagsList();
	public List<PostTag> retrievePostTags(PostTag pt);
	public PostTag retrievePostTag(String artseq);
	public int countPostTags();
	public boolean existsPostTag(String searchWord);
	
	public void modifyPostTag(PostTag pos);
	public void removePostTag(PostTag pos);
}
