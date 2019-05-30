package com.nakuh.web.cmm;

import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component @Data @Lazy
public class Proxy{
	private String searchdate,resselect,proselect,searchword,number;
	private int pageNum,pageSize,blockSize,
				   startRow,endRow,startpage,endpage,
				   prevBlock,nextBlock,totalCount;
	private boolean existPrev,existNext;
	 
	public void carryOut(Map<?,?> paramMap) {
		//page_num,page_size,blocksize,totalCount
		
		this.pageNum =(paramMap.get("page_num")==null)?1:Integer.parseInt((String) paramMap.get("page_num"));
		this.pageSize =(paramMap.get("page_size")==null)?5:Integer.parseInt((String) paramMap.get("page_size"));
		
		
		totalCount = (int) paramMap.get("totalCount");
		int pageCount = totalCount/pageSize;
		if(totalCount%pageSize!=0) {
			pageCount++;
		}
		this.startRow = pageSize*(pageNum-1);
		this.blockSize =(paramMap.get("blocksize")==null)?5:Integer.parseInt((String) paramMap.get("blocksize"));
		
		
		this.existPrev = (pageNum<=blockSize)?false:true;
		
		startpage = ((pageNum-1)/blockSize)*blockSize+1;
		this.existNext = (startpage+blockSize)>pageCount?false:true;
		endpage = startpage + 4;
		if(endpage>pageCount) {
			endpage = pageCount;
		
		}

		prevBlock = startpage - blockSize;
		nextBlock = startpage + blockSize;
		
	}
}