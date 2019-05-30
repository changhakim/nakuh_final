package com.nakuh.web.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.nakuh.web.domain.Visitor;

@Component
public interface VisitorService {

	public void registVisitor(Visitor vs);
	
	public int todayVisitor();
	public int yesterdayVisitor();
	public List<Visitor> tenVisitor();
	public Visitor ageCount();
}