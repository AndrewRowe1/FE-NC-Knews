import React from 'react';

const ArticleList = () => {
  return (
    <ul>
      {articles.map((article) => {
        return <li key={article.article_id}>{article.title}</li>
      })}
    </ul>
  )
}

export default ArticleList