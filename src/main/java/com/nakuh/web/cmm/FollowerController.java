package com.nakuh.web.cmm;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nakuh.web.domain.Follower;
import com.nakuh.web.mapper.FollowerMapper;

@RestController
public class FollowerController {
	private static final Logger logger = LoggerFactory.getLogger(FollowerController.class);
	@Autowired Map<String, Object> map;
	@Autowired Follower fol;
	@Autowired FollowerMapper folmap;
	
	@GetMapping("/arti/follo/{mid}")
	public Map<?,?> feedfollo(@PathVariable String mid)throws Exception{
		logger.info("=========Feedfollo 진입======");
		map.clear();
		IFunction f = (String) -> folmap.selectAllFollowersList(mid);
		List<?> folList = (List<?>) f.apply(mid);
		map.put("follist", folList);
		
		return map;
	}
	@GetMapping("/arti/subfollo/{mid}")
	public Map<?,?> feedfollosub(@PathVariable String mid)throws Exception{
		logger.info("=========feedfollosub 진입======");
		map.clear();
		IFunction f = (String) -> folmap.selectFollowers(mid);
		List<?> folList = (List<?>) f.apply(mid);
		map.put("follist", folList);
		
		return map;
	}
	
	@GetMapping("/serach/follower/{mid}")
	public Map<?, ?> followerList(@PathVariable String mid)throws Exception{
		logger.info("============== followerList() {}  =================", "ENTER");
		map.clear();
		IFunction f = (String) -> folmap.selectFollowers(mid);
		List<?> ls = (List<?>) f.apply(mid);
		map.put("werlist", ls);
		return map;
	}
	@GetMapping("/serach/folloing/{mid}")
	public Map<?,?> folloingList(@PathVariable String mid)throws Exception{
		logger.info("============== folloingList() {}  =================", "ENTER");
		map.clear();
		IFunction f = (String) -> folmap.selectFollowing(mid);
		List<?> ls = (List<?>) f.apply(mid);
		map.put("inglist", ls);
		
		return map;
	}
	@PutMapping("/regist/folloing")
	public Map<?,?> registfolloing(@RequestBody Follower foll)throws Exception{
		logger.info("============== registfolloing() {}  =================", "ENTER");
		map.clear();
		IConsumer c = (Object o) -> folmap.insertFollower(foll);
		c.accept(foll);
		map.put("msg", "success");
		return map;
	}
	@DeleteMapping("/delete/unfollower")
	public Map<?,?> unfolloing(@RequestBody Follower foll)throws Exception{
		logger.info("============== unfolloing() {}  =================", "ENTER");
		map.clear();
		IConsumer c = (Object o) -> folmap.deleteFollower(foll);
		c.accept(foll);
		map.put("msg", "nufollowerSuccess");
		return map;
	}
	@GetMapping("/search/follo/{searchword}/{userid}")
	public Map<?,?> searching(@PathVariable String searchword,  @PathVariable String userid)throws Exception{
		logger.info("============== searching() {}  =================", "ENTER");
		map.clear();
		fol.setFolloid(userid);
		fol.setMid(searchword);
		IFunction f = (Object o) -> folmap.selectFollower(fol);
		List<?> ls = (List<?>) f.apply(fol);
		map.put("searclist", ls);
	
		return map;
	}
	
	
}
