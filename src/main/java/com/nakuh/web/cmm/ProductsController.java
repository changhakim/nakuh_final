package com.nakuh.web.cmm;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.binding.MapperMethod.ParamMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nakuh.web.domain.Product;
import com.nakuh.web.service.ProductServiceImpl;

@RestController
public class ProductsController {
	private static final Logger logger = LoggerFactory.getLogger(ProductsController.class);
	private static final int[] MAX_DAYS = { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
	private static final int[] LEAP_MAX_DAYS = { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

	@Autowired
	Product product;
	@Autowired
	ProductServiceImpl productService;
	@Autowired
	HashMap<String, Object> map;
	@Autowired
	List<Product> list;

	// 상품 전체목록
	@GetMapping("/products/")
	public Map<?, ?> prolist() {
		logger.info("=======  ProductController prolist:상품 전체목록  진입 ======");
		list = productService.findAllProduct();
		map.clear();
		map.put("list", list);
		return map;
	}

	// 상품 카테고리별 조회
	@PostMapping("/catesearch/{cate}")
	public Map<?, ?> cateAlllist(@PathVariable String cate, @RequestBody Product param) {
		logger.info("=======  ProductController prosomelist:상품카테고리별 전체조회  진입 ======");
		map.clear();
		product.setSearchword(param.getSearchword());
		product.setAreatitle(param.getAreatitle());
		product.setPricetitle(param.getPricetitle());
		product.setCategory(cate);
		product.setPageSize(param.getPageSize());
		product.setStartRow(param.getStartRow());
		list = productService.findCateProducts(product);
		map.put("list", list);
		return map;
	}

	// 상품 일부 조회
	@GetMapping("/prosearch/{company}")
	public Map<?, ?> prosomelist(@PathVariable String search) {
		logger.info("=======  ProductController prosomelist:상품일부조회  진입 ======");
		product.setProname(search);
		list = productService.findSomeProducts(product);
		map.clear();
		map.put("list", list);
		return map;
	}

	// 상품 상세 조회
	@PostMapping("/products/{company}")
	public Map<?, ?> proinfo(
			@PathVariable String company) {
		logger.info("=======  ProductController proinfo:상품상세조회  진입 ======");
		Calendar cal = Calendar.getInstance();
		int today = cal.get(Calendar.DATE);
		cal.set(Calendar.DATE, 1);
		int sDayNum = cal.get(Calendar.DAY_OF_WEEK);// 1일의 요일 얻어오기, SUNDAY (1) .MONDAY(2) , TUESDAY
		int endDate = cal.getActualMaximum(Calendar.DATE); // 달의 마지막일 얻기
		int nowYear = cal.get(Calendar.YEAR);// 현재년
		int nowMonth = cal.get(Calendar.MONTH)+1;// 현재월
		int sDay = sDayNum;
		List<String> callist = new ArrayList<>();
		List<String> calday = new ArrayList<>();
		// 1일이 시작되는 이전의 요일 공백으로 채우기
		for (int i = 1; i < sDayNum; i++) {
			callist.add("★");
		}
		for (int i = 1; i <= endDate; i++) {
			callist.add(String.valueOf(i));
			if (i < 10) {
				calday.add(nowYear + "-" + "0" + nowMonth + "-" + "0" + i);
			} else {
				calday.add(nowYear + "-" + "0" + nowMonth + "-" + i);
			}
		}
		String realtoday = nowYear + "-" + "0" + nowMonth + "-" +today;
		String calheader = nowYear+"년"+nowMonth+"월";
		product.setCompany(company);
		map.clear();
		map = productService.findProduct(product);
		map.put("calheader", calheader);
		map.put("callist", callist);
		map.put("calday", calday);
		map.put("today", today);
		map.put("realtoday",  realtoday);
		return map;
	}

	// 예약 메인의 datepicker
	@GetMapping("/load")
	public HashMap<?, ?> load(ModelMap model) {
		logger.info("=======  ProductController 로드  진입 =====");
		HashMap<String, Object> map = new HashMap<>();
		map.put("t",
				"<input type='text' class='form-control border-right hasDatepicker' id='date_search' placeholder='로드 테스트 중 ...'>");
		return map;
	}
	
}