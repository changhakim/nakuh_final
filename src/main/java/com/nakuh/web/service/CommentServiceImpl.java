package com.nakuh.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.domain.Comment;
import com.nakuh.web.mapper.CommentMapper;

@Service
public class CommentServiceImpl implements CommentService{
	
	@Autowired CommentMapper comMap;
	
	@Override
	public void registComment(Comment com) {
		comMap.insertComment(com);
		
	}

	@Override
	public List<Comment> bringAllCommentsList() {
		
		return comMap.selectAllCommentsList();
	}

	@Override
	public List<Comment> retrieveComments() {
		
		return comMap.selectComments();
	}

	@Override
	public List<Comment> retrieveComment(String titleseq) {
		
		return comMap.selectComment(titleseq);
	}

	@Override
	public int countComments(String ci) {
		int i = comMap.countComments(ci);
		return i;
	}

	@Override
	public boolean existsComment(Comment com) {
		boolean res = false;
		res = comMap.existsComment(com);
		return res;
	}

	@Override
	public void modifyComment(Comment com) {
		comMap.updateComment(com);
		
	}

	@Override
	public void removeComment(Comment com) {
		comMap.deleteComment(com);
		
	}

	@Override
	public Comment retrieveOneComment(String titleseq) {
		return comMap.selectOneComment(titleseq);
	}


}
