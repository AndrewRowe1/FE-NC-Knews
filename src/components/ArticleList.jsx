import React from 'react';
import { Link } from '@reach/router';

const ArticleList = ({ articles }) => {
  return (
    <div>
      <Link to={`/articles/${articles.article_id}`} />
      <ul>
        {articles.map((article) => {
          return <li key={article.article_id}>{article.title}{' '}{article.author}</li>
        })}
      </ul>
    </div>
  )
}

export default ArticleList