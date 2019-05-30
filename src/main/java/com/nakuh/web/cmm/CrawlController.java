package com.nakuh.web.cmm;

import java.io.IOException;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CrawlController {

	@Autowired Map<String, Object> map;
	@GetMapping("/naver")
	public Map<String, Object> naver() throws IOException{
		String url = "https://search.shopping.naver.com/search/all.nhn?query=나이키&cat_id=&frm=NVSHATC";
		Document doc = Jsoup.connect(url).get();
		Elements el = doc.select(".img_area");
		Elements el1 = doc.select(".info");
		String crawl = "";
		for(int i = 0;i<6;i++) {
		crawl += el.get(i)+"\n"+el1.get(i)+"\n";
		}
		System.out.println(crawl);
		map.clear();
		map.put("crawl", crawl);
		
		
		return map;
	}
	@GetMapping("/wheater")
	public Map<String, Object> wheather() throws IOException{
		String url = "https://www.accuweather.com/ko/kr/south-korea-weather";
		Document doc = Jsoup.connect(url).get();
		 Elements els = doc.select(".clearfix");
		System.out.println(els.html());
		/*
		 * for(Element el : els.select(".forecast-table-cell")) {
		 * System.out.println(el.text()); }
		 */
		map.clear();
		map.put("crawl", 1);
		
		
		return map;
	}
}
