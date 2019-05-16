import React, { Component } from 'react';
import { getArticle } from '../api';
import { Router, Link, navigate } from '@reach/router';
import ArticleComments from './ArticleComments';

class Article extends Component {
  state = { article: null, loading: true, display: true };

  render () {
    const { article, loading, display } = this.state;
    //const { state: locationState } = this.props.location;
    //const {location} = this.props;
    return loading ? <p>loading ...</p> : (
      <div>
        <h1>{article.title}</h1>
        <table>
          <tbody>
            <tr className="articleList">
              <th>Author</th>
              <th>Article ID</th>
              <th>Votes</th>
              <th>Created At</th>
              <th>Body</th>
            </tr>
            <tr>
              <td>{article.author}</td>
              <td>{article.article_id}</td>
              <td>{article.votes}</td>
              <td>{article.created_at}</td>
              <td>{article.body}</td>
            </tr>
          </tbody>
        </table>
        <div onClick={this.handleClick}>
          {display ?
            <Link to={`/articles/${article.article_id}/comments`} >Go to comments</Link>
            : null}
        </div>
        < Router >
          <ArticleComments path="comments" article={article} loggedInUser={this.props.loggedInUser} handleClick={this.handleClick} />
        </Router>
      </div >
    );
  }

  componentDidMount () {
    getArticle(this.props.article_id)
      .then(article => {
        this.setState({ article, loading: false })
      })
  }
  //.catch (({ response: { data, status } }
  //console.log(data.message, status)
  //navigate(`/error`, { state: { from: article, msg: data.message, status }, replace: true });

  /*componentDidUpdate () {
    const { display } = this.state;
    if (!display) {
      this.setState({ display: true })
    }
  }*/

  handleClick = event => {
    console.log(event)
    if (event === true) {
      this.setState({ display: true })
    } else {
      this.setState({ display: false })
    }
  }

  /*<button onClick={this.displayComments}>
                  Article comments
                </button>
  */
  displayComments = () => {
    const { article } = this.state;
    navigate(`/articles/${article.article_id}/comments`, { state: { new: true } });
  }
}

export default Article;