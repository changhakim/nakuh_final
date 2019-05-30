package com.nakuh.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data@Component
public class Member {
	private String mid, password, name, birth, mail, phone, profilephoto;
}
