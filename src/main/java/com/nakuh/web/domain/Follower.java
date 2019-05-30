package com.nakuh.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class Follower {
	private String folloseq, folloid, mid, artdate, artnum, follpphoto , name, follostate;
}
