package com.nakuh.web.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.cmm.Proxy;
import com.nakuh.web.domain.Reservation;
import com.nakuh.web.mapper.ReservationMapper;

@Service
public class ReservationServiceImpl implements ReservationService {

	@Autowired ReservationMapper resMap;
	@Autowired Reservation res;
	@Autowired Proxy pxy;
	@Autowired List<Reservation> reslist;
	@Autowired Map<String, Object> map;
	@Override
	public void createReservation(List<Reservation> param) {
		for(int i=0;i<param.size();i++) {
			resMap.insertReservation(param.get(i));
		}
		
	}

	@Override
	public List<Reservation> findAllReservation() {
		return resMap.selectAllReservation();
	}

	@Override
	public List<Reservation> findSomeReservations(Reservation param) {
		return resMap.selectSomeReservations(param);
	}

	@Override
	public Reservation findReservation(Reservation param) {
		return resMap.selectReservation(param);
	}

	@Override
	public int countReservation() {
		return resMap.countReservation();
	}

	@Override
	public void modifyReservation(Reservation param) {
		resMap.updateReservation(param);
	}

	@Override
	public void removeReservation(Reservation param) {
		resMap.deleteReservation(param);
	}

	@Override
	public Map<String, Object> adminSearchReservation(Proxy pxy1) {
		map.clear();
		map.put("page_num", pxy1.getNumber());
		map.put("page_size", "10");
		map.put("blocksize", "5");
		map.put("totalCount", (int)resMap.countSearchReservation(pxy1));
		pxy1.carryOut(map);
		if(pxy1.getResselect()=="전체날짜") {
			pxy1.setResselect("");
		}
		if(pxy1.getProselect()=="전체상품") {
			pxy1.setProselect("");
		}
		reslist = resMap.adminSearchReservation(pxy1);
		map.put("reslist", reslist);
		map.put("pxy", pxy1);
		return map;
	}

}