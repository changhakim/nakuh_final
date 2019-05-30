package com.nakuh.web.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.nakuh.web.cmm.Proxy;
import com.nakuh.web.domain.Reservation;

@Component
public interface ReservationService {
	public void createReservation(List<Reservation> param);
	public List<Reservation> findAllReservation();
	public List<Reservation> findSomeReservations(Reservation param);
	public Reservation findReservation(Reservation param);
	public int countReservation();
	public void modifyReservation(Reservation param);
	public void removeReservation(Reservation param);
	public Map<String, Object> adminSearchReservation(Proxy pxy1);
}
