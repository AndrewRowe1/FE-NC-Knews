import React, { Component } from 'react';
import { getArticle, patchArticle } from '../api';
import { Router, Link, navigate } from '@reach/router';
import ArticleComments from './ArticleComments';
import FormatDate from './FormatDate';

class Article extends Component {
  state = { article: null, loading: true, display: true, votes: 0, disable: false };

  render () {
    const { article, loading, display, votes, disable } = this.state;
    const { loggedInUser } = this.props;

    return loading ? <p>loading ...</p> : (
      <div>
        <h1>{article.title}</h1>
        <table>
          <tbody>
            <tr className="articleList">
              <th>Author</th>
              <th>Votes</th>
              <th>Created At</th>
              <th>Body</th>
            </tr>
            <tr>
              <td>{article.author}</td>
              <td>{article.votes + votes}</td>
              <td>
                <div>
                  <FormatDate dateToFormat={article.created_at} />
                </div>
              </td>
              <td>{article.body}</td>
            </tr>
          </tbody>
        </table>
        {loggedInUser ? (
          <div>
            <button disabled={votes === 1 || disable} onClick={() => this.handleVote(1)}> like</button>
            <button disabled={votes === -1 || disable} onClick={() => this.handleVote(-1)}> dislike</ button>
          </div>
        ) : null}
        <div onClick={this.handleClick}>
          {display ? <Link to={`/articles/${article.article_id}/comments`} >Go to comments</Link>
            : null}
        </div>
        <Router>
          <ArticleComments path="comments" article={article} loggedInUser={this.props.loggedInUser} handleClick={this.handleClick} />
        </Router>
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

  componentDidUpdate (prevProps) {
    const { loggedInUser } = this.props;
    if (prevProps.loggedInUser !== loggedInUser) {
      this.setState({ votes: 0 })
    }
  }

  handleVote = (direction) => {
    this.setState({ disable: true })
    patchArticle(this.props.article_id, { inc_votes: direction })
      .then(article => {
        this.setState((prevState) => {
          const newVote = prevState.votes + direction;
          return {
            votes: newVote, disable: false
          }
        })
      })
  }

  handleClick = event => {
    if (event === true) {
      this.setState({ display: true })
    } else {
      this.setState({ display: false })
    }
  }

  displayComments = () => {
    const { article } = this.state;
    navigate(`/articles/${article.article_id}/comments`, { state: { new: true } });
  }
}

//pagination
/* 
total_count in state - needs destructuring from get axios request
<button disabled={p<Math.ceil(total_count / 10)} onClick={() => { this.changePage(1) }} >More Articles</button>
<button disabled={this.state.p === 1} onClick={() => { this.changePage(-1) }} >Previous Articles</button>

changePage = direction => {
  this.setState(prevState => {
    return { p: prevState.p + direction };
  })
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.p !== this.state.p) {
    getArticles
  }
}*/

export default Article;
