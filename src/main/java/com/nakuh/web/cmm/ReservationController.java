package com.nakuh.web.cmm;

import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nakuh.web.domain.Reservation;
import com.nakuh.web.service.ReservationServiceImpl;

@RestController
public class ReservationController {
	private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);

	@Autowired
	Reservation reservation;
	@Autowired
	ReservationServiceImpl resService;
	@Autowired
	HashMap<String, Object> map;
	@Autowired
	List<Reservation> list;

	/* 상품 예약하기 */
	@PutMapping("/reservation")
	public HashMap<?, ?> reserve(@RequestBody List<Reservation> param) {
		logger.info("=======  ReservationController reserve:상품예약 진입 ======");
		resService.createReservation(param);
		map.clear();
		map.put("msg", "reserve success");
		return map;
	}
	
	/*마이페이지 : 예약한 상품 조회하기 */ 
	@PostMapping("/reservation/{mid}")
	public HashMap<?, ?> resSomelist(@PathVariable String mid){
		logger.info("=======  ReservationController reserve:예약목록 조회 진입 ======");
		reservation.setMid(mid);
		list = resService.findSomeReservations(reservation);
		map.clear();
		map.put("list", list);
		return map;
	}
	
	
}
