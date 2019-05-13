import React from 'react';

const ArticleList = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => {
        return <li key={article.article_id}>{article.title}{' '}{article.author}</li>
      })}
    </ul>
  )
}

export default ArticleList