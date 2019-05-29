import React from 'react';
import { Link } from '@reach/router';
import FormatDate from './FormatDate';
import '../css/ArticlesList.css';

const ArticlesList = ({ articles }) => {
  return (
    <ul class="flex-container">
      {articles.map((article) => {
        return <table class="table" key={article.article_id}>
          <tbody class="tbody">
            <tr class="tr" className="articleList">
              <th class="th">Author</th>
              <th class="th">Title</th>
              <th class="th">Votes</th>
              <th class="th">Created At</th>
              <th class="th">Comment Count</th>
              <th class="th">Body</th>
              <th class="th">Go to Article</th>
            </tr>
            <tr class="tr">
              <td class="td">{article.author}</td>
              <td class="td">{article.title}</td>
              <td class="td">{article.votes}</td>
              <td class="td">
                <div>
                  <FormatDate dateToFormat={article.created_at} />
                </div>
              </td>
              <td class="td">{article.comment_count}</td>
              <td class="td">{firstTenWords(article.body)}</td>
              <td class="td">
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
