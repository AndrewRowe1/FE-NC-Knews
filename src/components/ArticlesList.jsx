import React from 'react';
import { Link } from '@reach/router';
import FormatDate from './FormatDate';
import '../css/ArticlesList.css';

const ArticlesList = ({ articles }) => {
  return (
    <table className="table">
      {articles.map((article) => {
        return <React.Fragment key={article.article_id}>
          <tbody className="tbody">
            <tr className="tr" >
              <th className="th">Author</th>
              <th className="th">Title</th>
              <th className="th">Votes</th>
              <th className="th">Created At</th>
              <th className="th">Comment Count</th>
              <th className="th">Body</th>
              <th className="th">Go to Article</th>
            </tr>
            <tr className="tr">
              <td className="td">{article.author}</td>
              <td className="td">{article.title}</td>
              <td className="td">{article.votes}</td>
              <td className="td">
                <div>
                  <FormatDate dateToFormat={article.created_at} />
                </div>
              </td>
              <td className="td">{article.comment_count}</td>
              <td className="td">{firstTenWords(article.body)}</td>
              <td className="td">
                <Link to={`/articles/${article.article_id}`}>Get {article.title} article </Link>
              </td>
            </tr>
          </tbody>
        </React.Fragment>
      })}
    </table>
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
