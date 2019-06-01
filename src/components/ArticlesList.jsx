import React, { Component } from 'react';
import { Link } from '@reach/router';
import ArticleVoting from './ArticleVoting';
import FormatDate from './FormatDate';
import '../css/ArticlesList.css';

class ArticlesList extends Component {
  render () {
    const { loggedInUser, articles } = this.props;
    return (
      <table className="table">
        <tbody className="tbody">
          <tr className="tr" >
            <th className="th">Author</th>
            <th className="th">Title</th>
            <th className="th">Created At</th>
            <th className="th">Comment Count</th>
            <th className="th">Body</th>
            <th className="th">Go to Article</th>
            <th className="th">Votes</th>
            <th className="th">
              {loggedInUser ? <div>Vote on Article</div> : null}
            </th>
          </tr>
          {articles.map((article) => {
            return <React.Fragment key={article.article_id}>
              <tr className="tr">
                <td className="td">{article.author}</td>
                <td className="td">{article.title}</td>
                <td className="td">
                  <div>
                    <FormatDate dateToFormat={article.created_at} />
                  </div>
                </td>
                <td className="td">{article.comment_count}</td>
                <td className="td">{this.firstTenWords(article.body)}</td>
                <td className="td">
                  <Link to={`/articles/${article.article_id}`}>Get {article.title} article </Link>
                </td>
                <ArticleVoting article={article} loggedInUser={loggedInUser} />
              </tr>
            </React.Fragment>
          })}
        </tbody>
      </table>
    )
  }

  firstTenWords = string => {
    const arr = string.split('');
    let count = 0;
    for (let i = 0; i <= arr.length; i++) {
      if (arr[i] === ' ') {
        count++;
      }
      if (count === 10 || i === arr.length) {
        return arr.slice(0, i).join('');
      }
    }
  }
}

export default ArticlesList;
