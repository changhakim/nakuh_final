package com.nakuh.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.domain.Member;
import com.nakuh.web.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService{

	@Autowired MemberMapper memMap;	
	
	@Override
	public void registMember(Member mem) {
		memMap.insertMember(mem);
		
	}

	@Override
	public List<Member> bringAllMembersList(String mid) {
		
		return memMap.selectAllMembersList(mid);
	}

	@Override
	public List<Member> retrieveMembers() {
		
		return memMap.selectMembers();
	}

	@Override
	public List<Member> retrieveMembers(String mid) {
		
		return memMap.selectMembers(mid);
	}

	@Override
	public int countMembers() {
		int i = memMap.countMembers();
		return i;
	}

	@Override
	public Member existsMember(Member m) {
		
		return memMap.existsMember(m) ;
	}

	@Override
	public void modifyMember(Member mem) {
		memMap.updateMember(mem);
		
	}

	@Override
	public void removeMember(Member mem) {
		memMap.deleteMember(mem);
		
	}

	@Override
	public boolean existsMemberforkakao(String searchword) {
		boolean res = memMap.existMemberForKakao(searchword);
		return res;
	}

}
