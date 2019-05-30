package com.nakuh.web.cmm;

import java.io.File;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.nakuh.web.domain.Article;
import com.nakuh.web.mapper.ArticleMapper;

@RestController
@Transactional
public class Fileupload {
	private static final Logger logger = LoggerFactory.getLogger(Fileupload.class);
	//public static final String SAVED_FILES = "C:\\Users\\1027\\nakuh_Project\\nakuh03_workspace\\nakuh03\\src\\main\\webapp\\resources\\img\\aquagram\\articles\\";
	/*
	 * C:\Users\1027\nakuh3\nakuh03\src\main\webapp\resources\img\aquagram\articles\//창하꺼
	 * C:\Users\1027\nakuh_Project\nakuh03_workspace\nakuh03\src\main\webapp\resources\img\aquagram\articles\//형꺼
	 * //Users//deep//nakuh_project//nakuh03_workspace//nakuh03//src//main//webapp//resources//img//aquagram//articles//  //맥북
	 */	
	@Resource(name = "uploadPath")
	private String uploadPath;
	
	@Autowired Article art;
	@Autowired ArticleMapper artMap;
	@Autowired Map<String, Object> map;

	
	@PostMapping("/upload/image")
	public Map<?, ?> imgupload(MultipartHttpServletRequest request)throws  Exception{
		logger.info("============== imageUpload() {}  =================", "ENTER");
		
		String res = "";
		Iterator<String> it=request.getFileNames();
		  if(it.hasNext()){
              MultipartFile file=request.getFile(it.next());
              logger.info("file upload result:{}",  "success");
              logger.info("upload file name:{}",  file.getName());
              logger.info("upload file size:{}",  file.getSize());
              logger.info("upload file exist:{}",  file.isEmpty());
              logger.info("upload file original name:{}",  file.getOriginalFilename());
              logger.info("upload file:{}",  file.getOriginalFilename());
              String filename = file.getOriginalFilename();
              Random random = new Random();
              String ml = "";
              for(int i=0; i<=9; i++) {
            	  ml += random.nextInt(10);
              }
              art.setArtphoto(filename.substring(0, filename.indexOf("."))+ml+(art.getMid().substring(3)));
              art.setExtension(filename.substring(filename.lastIndexOf(".")+1));
              IPredicate p =(Object o)-> artMap.existsArticle(art);
              //int rs = 1;//artservice.registArticle(art); 
			/* IPredicate p =(Object o)-> artMap.existsArticle(art); */
              // DB 에 파일 저장하는 서비스 메소드 연결. 여기서는 무조건 성공인 1로 처리
              if(p.test(art)==true){
                  logger.info("file upload insert: {}",  "success");
                  File dest = new File(uploadPath +  art.getArtphoto() +"."+ art.getExtension());
                  file.transferTo(dest);
                  res = "등록 성공";
              }else{
                  logger.info("file upload insert: {}",  "fail");
                  res = "등록 실패";
              }
          }else{
              logger.info("file upload result: {}", "fail");
              res = "등록 실패";
          }
          map.clear();
          map.put("res", res);
          
		return map;
	};
}
