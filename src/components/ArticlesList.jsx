import React from 'react';
import { Link } from '@reach/router';
import FormatDate from './FormatDate';

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
              <td>{article.body}</td>
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

export default ArticlesList;
