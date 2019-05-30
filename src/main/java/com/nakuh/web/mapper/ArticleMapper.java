package com.nakuh.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.nakuh.web.cmm.Proxy;
import com.nakuh.web.domain.Article;

@Repository
public interface ArticleMapper {
	public void insertArticle(Article art);
	
	public List<Article> selectAllArticlesList(Article art);
	public List<Article> selectArticles(Article art);
	public Article selectArticlesDetail(String artnum);
	public Article countnavArticle(Article art);
	public Article countsnavArticle(String mid);
	public Article selectArtnum(String artphoto);
	public int countArticles(String mid);
	public boolean existsArticle(Article art);
	
	public void updateArticle(Article art);
	public void deleteArticle(Article art);
}
