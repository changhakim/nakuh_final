package com.nakuh.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nakuh.web.cmm.Proxy;
import com.nakuh.web.domain.Article;
import com.nakuh.web.mapper.ArticleMapper;

@Service
public class ArticleServiceImpl implements ArticleService{

	@Autowired ArticleMapper artmap;
	
	@Override
	public void registArticle(Article art) {
		artmap.insertArticle(art);
		
	}

	@Override
	public List<Article> bringAllArticlesList(Article art) {
		// TODO Auto-generated method stub
		return artmap.selectAllArticlesList(art);
	}


	@Override
	public List<Article> retrieveArticles(Article art) {
		// TODO Auto-generated method stub
		return artmap.selectArticles(art);
	}

	@Override
	public int countArticles(String mid) {
		int i = artmap.countArticles(mid);
		
		return i;
	}

	@Override
	public boolean existsArticle(Article art) {
		boolean res = false;
		res = artmap.existsArticle(art);
		
		return res;
	}

	@Override
	public void modifyArticle(Article art) {
		artmap.updateArticle(art);
		
	}

	@Override
	public void removeArticle(Article art) {
		artmap.deleteArticle(art);
		
	}

	@Override
	public Article retrieveArticleDetail(String artnum) {
		
		return artmap.selectArticlesDetail(artnum);
	}

	@Override
	public Article countnavArticles(Article art) {
		// TODO Auto-generated method stub
		return artmap.countnavArticle(art);
	}

	@Override
	public Article retrieverArtnum(String artphoto) {
		
		return artmap.selectArtnum(artphoto);
	}

}
