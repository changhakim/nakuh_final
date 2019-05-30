package com.nakuh.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.nakuh.web.domain.PostTag;

@Repository
public interface PostTagMapper {
	public void insertPostTag(PostTag pos);
	
	public List<PostTag> selectAllPostTagsList();
	public List<PostTag> selectPostTags(PostTag pt);
	public PostTag selectPostTag(String artseq);
	public int countPostTags();
	public boolean existsPostTag(String searchWord);
	
	public void updatePostTag(PostTag pos);
	public void deletePostTag(PostTag pos);
}
