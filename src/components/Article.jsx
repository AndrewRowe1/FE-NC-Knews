import React, { Component } from 'react';
import { getArticle } from '../api';
import { Router, navigate } from '@reach/router';
import ArticleComments from './ArticleComments';

class Article extends Component {
  state = { article: null, loading: true, display: true };

  render () {
    const { article, loading, display } = this.state;
    //const { state: locationState } = this.props.location;
    //const {location} = this.props
    return loading ? <p>loading ...</p> : (
      <div>
        <h1>{article.title}</h1>
        {display ?
          <table>
            <tbody>
              <tr className="articleList">
                <th>Author</th>
                <th>Article ID</th>
                <th>Votes</th>
                <th>Created At</th>
                <th>Body</th>
                <th>View Comments for Article</th>
              </tr>
              <tr>
                <td>{article.author}</td>
                <td>{article.article_id}</td>
                <td>{article.votes}</td>
                <td>{article.created_at}</td>
                <td>{article.body}</td>
                <td>
                  <button onClick={this.displayComments}>
                    Article comments
                </button>
                </td>
              </tr>
            </tbody>
          </table> : null}
        < Router >
          <ArticleComments path="comments" article={article} loggedInUser={this.props.loggedInUser} />
        </Router>
      </div >
    );
  }

  displayComments = () => {
    const { article } = this.state;
    this.setState({ display: false });
    navigate(`/articles/${article.article_id}/comments`, { state: { new: true } });
  }

  componentDidMount () {
    getArticle(this.props.article_id)
      .then(article => {
        this.setState({ article, loading: false, display: true })
      })
    //.catch (({ response: { data, status } }
    //console.log(data.message, status)
    //navigate(`/error`, { state: { from: article, msg: data.message, status }, replace: true });
  }
}

export default Article;