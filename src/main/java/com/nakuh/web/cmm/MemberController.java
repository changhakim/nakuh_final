package com.nakuh.web.cmm;


import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nakuh.web.domain.Member;
import com.nakuh.web.domain.Visitor;
import com.nakuh.web.mapper.MemberMapper;
import com.nakuh.web.service.MemberServiceImpl;
import com.nakuh.web.service.VisitorServiceImpl;

@RestController
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	@Autowired Map<String,Object> map;
	@Autowired Member member;
	@Autowired MemberServiceImpl memberservice; 
	@Autowired MemberMapper memberMap;
	@Autowired VisitorServiceImpl visiservice;
	@Autowired Visitor vis;
	
	@Transactional
	@PostMapping("/login/kakao/{kaid}")
	public Map<?,?> login(@RequestBody Map<?,?> res) {
		logger.info("=========login 진입======");
		member.setMid(res.get("id").toString());
		member.setMail(res.get("email").toString());
		member.setProfilephoto(res.get("profileimg").toString());
		member.setName(res.get("name").toString());
		IPredicate p = (Object o) -> memberMap.existMemberForKakao(member.getMid());
		if(p.test(member.getMid())) {
			map.clear();
			IConsumer c = (Object o) -> memberMap.insertMember(member);
			c.accept(member);
			map.put("msg", "JOIN SUCCESS");
			
		} else {
			map.clear();

			IFunction f = (Object o) -> memberMap.selectMembers(member.getMid());
			f.apply(member);
			vis.setVisitid(member.getMid());
			visiservice.registVisitor(vis);
			map.put("msg", "LOGIN SUCCESS");
			map.put("m", f.apply(member));

		}
		
		/*
		 * map.clear(); map.put("member", member);
		 * System.out.println(map.get("member").toString());
		 */
	
		return map;
	}
	@PostMapping("/login/general")
	public Map<?, ?> generallogin(@RequestBody Member m){
		map.clear();
		IFunction f = (Object o) -> memberservice.existsMember(m);
		vis.setVisitid(m.getMid());
		visiservice.registVisitor(vis);
		if(f.apply(m)==null) {
		member.setMid("1");
		map.put("member", member);
		}else {
		 map.put("member", f.apply(m));
		}
		
		return map;
	}
	
}
