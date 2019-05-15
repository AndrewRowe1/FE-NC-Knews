import React from 'react';
import { navigate } from '@reach/router'

const ArticlesList = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => {
        return <table>
          <tbody>
            <tr className="articleList">
              <th>Author</th>
              <th>Title</th>
              <th>Article ID</th>
              <th>Votes</th>
              <th>Created At</th>
              <th>Comment Count</th>
              <th>Body</th>
              <th>Go to Article</th>
            </tr>
            <tr>
              <td>{article.author}</td>
              <td>{article.title}</td>
              <td>{article.article_id}</td>
              <td>{article.votes}</td>
              <td>{article.created_at}</td>
              <td>{article.comment_count}</td>
              <td>{article.body}</td>
              <td>
                <button key={article.article_id} onClick={() => navigate(`/articles/${article.article_id}`, { state: { new: true } })}>Get {article.title} article
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      })}
    </ul>
  )
}

export default ArticlesList;