package com.nakuh.web.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.nakuh.web.domain.Article;

@Component
public interface ArticleService {
	public void registArticle(Article art);
	
	public List<Article> bringAllArticlesList(Article art);
	public List<Article> retrieveArticles(Article art);
	
	public Article retrieveArticleDetail(String artnum);
	public Article countnavArticles(Article art);
	public Article retrieverArtnum(String artphoto);
	public int countArticles(String mid);
	public boolean existsArticle(Article art);
	
	public void modifyArticle(Article art);
	public void removeArticle(Article art);
	
}
