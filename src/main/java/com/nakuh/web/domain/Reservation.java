package com.nakuh.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data@Component
public class Reservation {
	private String resnum, mid, resname, startdate, ampm, phone, resdate, rescount, 
	deposit, message, proname, company, pronum,category,ocean,river,hotel,proimg;
}
