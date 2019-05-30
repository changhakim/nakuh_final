package com.nakuh.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.nakuh.web.cmm.Proxy;
import com.nakuh.web.domain.Reservation;
import com.nakuh.web.domain.Visitor;

@Repository
public interface ReservationMapper {
	public void insertReservation(Reservation param);
	public List<Reservation> selectAllReservation();
	public List<Reservation> selectSomeReservations(Reservation param);
	public List<Reservation> selectpageReservations(Object o);
	public Reservation selectReservation(Reservation param);
	public int countReservation();
	public void updateReservation(Reservation param);
	public void deleteReservation(Reservation param);
	public List<Reservation> adminSearchReservation(Proxy pxy1);
	public int countSearchReservation(Proxy pxy1);
	public List<Reservation> resCateTerm(Visitor vis);
	public List<Reservation> resCateCount();
}
