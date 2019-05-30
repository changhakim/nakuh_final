package com.nakuh.web.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.nakuh.web.domain.Comment;

@Component
public interface CommentService {
	public void registComment(Comment com);
	
	public List<Comment> bringAllCommentsList();
	public List<Comment> retrieveComments();
	public List<Comment> retrieveComment(String titleseq);
	public Comment retrieveOneComment(String titleseq);
	public int countComments(String ci);
	public boolean existsComment(Comment com);
	
	public void modifyComment(Comment com);
	public void removeComment(Comment com);
}
