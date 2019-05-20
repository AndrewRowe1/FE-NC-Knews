import React, { Component } from 'react';
import { getArticle, patchArticle } from '../api';
import { Router, Link, navigate } from '@reach/router';
import ArticleComments from './ArticleComments';

class Article extends Component {
  state = { article: null, loading: true, display: true, votes: 0, disable: false };

  render () {
    const { article, loading, display, votes, disable } = this.state;
    const { loggedInUser } = this.props;
    //const { state: locationState } = this.props.location;
    //const {location} = this.props;
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
              <td>{article.created_at}</td>
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
        }
        else {
          this.setState({ article, loading: false, votes: 0 })
        }
      })
      .catch((error) => {
        navigate('/error')
      })
  }
  //.catch (({ response: { data, status } }
  //console.log(data.message, status)
  //navigate(`/error`, { state: { from: article, msg: data.message, status }, replace: true });

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

export default Article;
