import React, { Component } from 'react';
import { getArticle } from '../api';
import { navigate } from '@reach/router';
import ArticleComments from './ArticleComments';
import FormatDate from './FormatDate';
import '../css/Article.css';

class Article extends Component {
  state = { article: null, loading: true };

  render () {
    const { article, loading } = this.state;
    const { loggedInUser } = this.props;

    return loading ? <p>loading ...</p> : (
      <div>
        <h1>{article.title}</h1>
        <table>
          <tbody>
            <tr className="articleList">
              <th className="th">Author</th>
              <th className="th">Votes</th>
              <th className="th">Created At</th>
              <th className="th">Comment Count</th>
              <th className="th">Body</th>
            </tr>
            <tr>
              <td className="td">{article.author}</td>
              <td className="td">{article.votes}</td>
              <td className="td">
                <div>
                  <FormatDate dateToFormat={article.created_at} />
                </div>
              </td>
              <td className="td">{article.comment_count}</td>
              <td className="td">{article.body}</td>
            </tr>
          </tbody>
        </table>
        <ArticleComments article={article} loggedInUser={loggedInUser} />
      </div >
    );
  }

  componentDidMount () {
    getArticle(this.props.article_id)
      .then(article => {
        if (typeof article === 'string') {
          navigate('/error', { state: { msg: article }, replace: true });
        } else if (article.msg !== undefined) {
          navigate('/error', { state: { msg: article.msg }, replace: true });
        } else {
          this.setState({ article, loading: false, votes: 0 })
        }
      })
      .catch((error) => {
        navigate('/error')
      })
  }
}

export default Article;
