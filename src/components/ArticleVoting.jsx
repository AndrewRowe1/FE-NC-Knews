import React, { Component } from 'react';
import { patchArticle } from '../api';
import '../css/ArticleVoting.css';

class ArticleVoting extends Component {
  state = {
    disable: false, votes: 0
  }

  render () {
    const { article, loggedInUser } = this.props;
    const { disable, votes } = this.state;

    return (
      <React.Fragment>
        <td className="td">
          {article.votes + votes}
        </td>
        <td className="td">
          {loggedInUser ? (
            <div>
              <button disabled={votes === 1 || disable} onClick={() => this.handleVote(1)}> like</button>
              <button disabled={votes === -1 || disable} onClick={() => this.handleVote(-1)}> dislike</ button>
            </div>) : null}
        </td>
      </React.Fragment>
    )
  }

  handleVote = (direction) => {
    this.setState({ disable: true });
    const { article } = this.props;
    patchArticle(article.article_id, { inc_votes: direction })
      .then(article => {
        this.setState((prevState) => {
          const newVote = (prevState.votes || 0) + direction;
          return { votes: newVote, disable: false };
        })
      })
  }
}

export default ArticleVoting;
