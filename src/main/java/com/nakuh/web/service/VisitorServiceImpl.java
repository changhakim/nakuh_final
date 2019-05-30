package com.nakuh.web.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.domain.Visitor;
import com.nakuh.web.mapper.VisitorMapper;

@Service
public class VisitorServiceImpl implements VisitorService{
	@Autowired VisitorMapper vsm;
	@Autowired Visitor vis;
	@Autowired List<Visitor> ls;
	
	@Override
	public void registVisitor(Visitor vs) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String time = sdf.format(date);
		vs.setVisittime(time);
		vsm.insertVisitor(vs);
		
	}
	@Override
	public int todayVisitor() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		String time1 = sdf.format(date1);
		int today = vsm.todayVisitor(time1);
		return today;
	}
	@Override
	public int yesterdayVisitor() {
		Calendar c = new GregorianCalendar();
		c.add(Calendar.DATE, -1);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return vsm.yesterdayVisitor(sdf.format(c.getTime()));
	}
	@Override
	public List<Visitor> tenVisitor() {
		Calendar c = new GregorianCalendar();
		Date date = new Date();
		c.add(Calendar.DATE, -7);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String beforeten = sdf.format(c.getTime());
		String today = sdf.format(date);
		vis.setBeforevisit(beforeten);
		vis.setTodayvisit(today);
		ls = vsm.tenbefore(vis);
		return ls;
	}
	@Override
	public Visitor ageCount() {
		
		return vsm.ageCount();
	}

}