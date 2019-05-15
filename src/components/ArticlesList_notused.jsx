import React from 'react';
import { navigate } from '@reach/router';

const ArticlesList = ({ articles }) => {
  return (
    <ul key={articles.article_id}>
      {articles.map((article) => {
        return <div key={article.article_id}>
          <li>{article.title}{' '}{article.author}</li>
          <button key={article.article_id} onClick={() => navigate(`/articles/${article.article_id}`, { state: { new: true } })}>
            Get {article.title} article
          </button>
        </div>
      })}
    </ul>
  )
}

export default ArticlesList;