package com.nakuh.web.cmm;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nakuh.web.domain.Article;
import com.nakuh.web.domain.Comment;
import com.nakuh.web.domain.Dummy;
import com.nakuh.web.domain.Member;
import com.nakuh.web.domain.PostTag;
import com.nakuh.web.mapper.ArticleMapper;
import com.nakuh.web.mapper.CommentMapper;
import com.nakuh.web.mapper.MemberMapper;
import com.nakuh.web.mapper.PostTagMapper;
import com.nakuh.web.service.ArticleServiceImpl;
import com.nakuh.web.service.CommentServiceImpl;
import com.nakuh.web.service.PostTagServiceImpl;

@RestController
public class ArticlesController {
	private static final Logger logger = LoggerFactory.getLogger(ArticlesController.class);
	public static final String SAVED_FILES = "C:\\Users\\1027\\nakuh_Project\\nakuh03_workspace\\nakuh03\\src\\main\\webapp\\resources\\img\\aquagram\\articles\\";
	/*
	 * C:\Users\1027\nakuh3\nakuh03\src\main\webapp\resources\img\aquagram\articles\//창하꺼
	 * C:\Users\1027\nakuh_Project\nakuh03_workspace\nakuh03\src\main\webapp\resources\img\aquagram\articles\//형꺼
	 */	
	@Autowired Article art;
	@Autowired ArticleServiceImpl artservice;
	@Autowired Comment com;
	@Autowired CommentServiceImpl comservice;
	@Autowired PostTag pt;
	@Autowired PostTagServiceImpl postservice;
	@Autowired ArticleMapper artMap;
	@Autowired CommentMapper comMap;
	@Autowired PostTagMapper posMap;
	@Autowired MemberMapper memMap;
	@Autowired Member mem;
	@Autowired Proxy pxy;
	@Autowired Dummy dum;
	@Autowired List<Article> ls1;
	
	@Autowired Map<String, Object> map;
	
	@PostMapping("/myfeed/{mid}")
	public Map<?,?> articleList(
			@PathVariable String mid,
			@RequestBody Article param)throws  Exception {
		logger.info("=========ArticleList 진입======");
		map.clear();
		art.setMid(param.getMid());
		art.setStartRow(param.getStartRow());
		art.setPageSize(param.getPageSize());
		List<?> ls = (List<?>) artservice.retrieveArticles(art);
		map.put("myList", ls);

		
		return map;
	}
	
	@Transactional
	@PostMapping("/arti/detail/{artnum}")
	public Map<?,?> articleDetail(@PathVariable String artnum)throws  Exception{
		logger.info("=========ArticleDetail 진입======");
		map.clear();
		Article als = artservice.retrieveArticleDetail(artnum);
		map.put("als", als);
		List<?> cls = (List<?>) comservice.retrieveComment(als.getArtnum());
		map.put("cls", cls);
		pt.setArtseq(als.getArtnum());
		List<?> tls = postservice.retrievePostTags(pt);
		map.put("tls", tls);
		
		
		return map;
	}
	@PostMapping("/arti/feed/{mid}")
	public Map<?,?> articleFeed(String mid, @RequestBody Article arts)throws  Exception{
		logger.info("=========ArticleFeed 진입======");
		map.clear();
		art.setMid(arts.getMid());
		art.setStartRow(arts.getStartRow());
		art.setPageSize(arts.getPageSize());
		IFunction f2 = (Object o) -> artMap.selectAllArticlesList(art);
		List<?> list = (List<?>) f2.apply(art);
		map.put("ffeed", list);
		return map;
	}
	@GetMapping("/upnav/{mid}")
	public Map<?, ?> upnav(@PathVariable String mid)throws Exception{
		logger.info("=========upnav 진입======");
		map.clear();
		IFunction f1 = (Object o) -> artMap.countsnavArticle(mid);
		System.out.println(f1.apply(mid));
		System.out.println("참");
		map.put("upnav", f1.apply(mid));
		
		
		return map;
	}

	
	@PutMapping("/upload/arti")
	public Map<?, ?> artiupload(@RequestBody Dummy dum)throws Exception{
		logger.info("============== artiUpload() {}  =================", "ENTER");
		map.clear();
		art.setContent(dum.getSubCont());
		art.setTag(dum.getSubtag());
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		art.setArtdate(sdf.format(date));
		artMap.updateArticle(art);
		IFunction f= (Object ob) -> artMap.selectArtnum(art.getArtphoto());
		//postservice.insertPostTag(pt);
		map.put("seq", f.apply(art.getArtphoto()));
		
		return map;
	}
	
	@PostMapping("/upload/tag")
	public Map<?,?> tagupload(@RequestBody PostTag pos)throws Exception{
		logger.info("============== tagupload() {}  =================", "ENTER");
		map.clear();
		IConsumer C = (Object o) -> posMap.insertPostTag(pos);
		C.accept(pos);
		map.put("msg", "태그 입력성공");
		
		
		return map;
	}

	@GetMapping("/comments/list/{artnum}")
	public Map<?,?> feedcomment(@PathVariable String artnum)throws Exception{
		logger.info("============== feedcomment() {}  =================", "ENTER");
		com.setTitleseq(artnum);
		IFunction f = (Object o) -> comMap.selectComment(com.getTitleseq());
		List<?> cls = (List<?>) f.apply(com.getTitleseq());
		map.put("cls", cls);
		map.put("msg","feedcomment 성공:: ");
		return map;
	}
	
	@Transactional
	@PostMapping("/regist/comm/{comid}")
	public Map<?,?> registcomm(@RequestBody Comment co)throws Exception{
		logger.info("============== comminsert() {}  =================", "ENTER");
		map.clear();
		IPredicate p = (Object o) -> comMap.existsComment(co); 
		if(p.test(co)) {
			IFunction f = (Object o) -> comMap.selectOneComment(co.getTitleseq());
			map.put("comlist", f.apply(co.getTitleseq()));

		}
		
		
		return map;
	}
	@GetMapping("/all/list/{mid}")
	public Map<?,?> allmemberlist(@PathVariable String mid)throws Exception{
		logger.info("============== allmemberlist() {}  =================", "ENTER");
		map.clear();
		ISupplier S = () -> memMap.selectAllMembersList(mid);
		List<?> ls = (List<?>) S.get();
		map.put("all", ls);
		
		return map;
	}
	
	
}




