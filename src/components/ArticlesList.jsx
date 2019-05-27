import React from 'react';
import { Link } from '@reach/router';
import FormatDate from './FormatDate';
import '../css/ArticlesList.css';

const ArticlesList = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => {
        return <table key={article.article_id}>
          <tbody>
            <tr className="articleList">
              <th>Author</th>
              <th>Title</th>
              <th>Votes</th>
              <th>Created At</th>
              <th>Comment Count</th>
              <th>Body</th>
              <th>Go to Article</th>
            </tr>
            <tr>
              <td>{article.author}</td>
              <td>{article.title}</td>
              <td>{article.votes}</td>
              <td>
                <div>
                  <FormatDate dateToFormat={article.created_at} />
                </div>
              </td>
              <td>{article.comment_count}</td>
              <td>{firstTenWords(article.body)}</td>
              <td>
                <Link to={`/articles/${article.article_id}`}>Get {article.title} article </Link>
              </td>
            </tr>
          </tbody>
        </table>
      })}
    </ul>
  )
}

const firstTenWords = (string) => {
  const arr = string.split('');
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ' ') {
      count++;
    }
    if (count === 10) {
      return arr.slice(0, i).join('');
    }
  }
}

export default ArticlesList;
