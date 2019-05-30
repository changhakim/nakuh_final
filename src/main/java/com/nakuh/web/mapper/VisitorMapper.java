package com.nakuh.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.nakuh.web.domain.Visitor;

@Repository
public interface VisitorMapper {

	public void insertVisitor(Visitor vs);
	public int todayVisitor(String tvs);
	public int yesterdayVisitor(String tvs);
	public List<Visitor> tenbefore(Visitor vs);
	public Visitor ageCount();
}