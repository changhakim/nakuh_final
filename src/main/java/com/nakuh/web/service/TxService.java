package com.nakuh.web.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nakuh.web.cmm.Proxy;
import com.nakuh.web.domain.Visitor;
import com.nakuh.web.mapper.MemberMapper;
import com.nakuh.web.mapper.ReservationMapper;
import com.nakuh.web.mapper.VisitorMapper;

@Service
@Transactional
public class TxService {
	@Autowired Map<String, Object> map;
	@Autowired MemberMapper memMap;
	@Autowired VisitorMapper vsm;
	@Autowired Visitor vis;
	@Autowired List<Visitor> ls;
	@Autowired ReservationMapper resmapper;
	@Autowired Proxy pxy;
	public Map<String, Object> membertx(){
		map.clear();
		map.put("total", String.valueOf(memMap.countMembers()));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		map.put("today", String.valueOf(vsm.todayVisitor(sdf.format(date1))));
		Calendar c = new GregorianCalendar();
		c.add(Calendar.DATE, -1);
		map.put("yesterday", String.valueOf(vsm.yesterdayVisitor(sdf.format(c.getTime()))));
		c = new GregorianCalendar();
		c.add(Calendar.DATE, -7);
		String beforeten = sdf.format(c.getTime());
		String today1 = sdf.format(date1);
		vis.setBeforevisit(beforeten);
		vis.setTodayvisit(today1);
		map.put("term", vsm.tenbefore(vis));
		map.put("agegroup", vsm.ageCount());
		return map;
	}
	public Map<String, Object> reservation(Proxy pxy){
		map.clear();
		map.put("reslist",resmapper.selectpageReservations(pxy));
		map.put("pxy", pxy);
		System.out.println(pxy.toString());
		
		
		
		return map;
	}
	public Map<String, Object> reservChart(){
		map.clear();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = new Date();
		Calendar c = new GregorianCalendar();
		c.add(Calendar.DATE, -10);
		vis.setBeforevisit(sdf.format(c.getTime()));
		vis.setTodayvisit(sdf.format(date1));
		map.put("chartlist", resmapper.resCateTerm(vis));
		map.put("catecount", resmapper.resCateCount());
		return map;
	}

}