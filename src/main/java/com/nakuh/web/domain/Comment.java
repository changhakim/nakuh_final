package com.nakuh.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data@Component
public class Comment {
	private String commseq, titleseq, comm, comid, cmname, comprophoto;
}
