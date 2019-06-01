import React, { Component } from 'react';
import { patchComment } from '../api';
import '../css/CommentVoting.css';

class CommentVoting extends Component {
  state = {
    disable: false, votes: 0
  }

  render () {
    const { comment, loggedInUser } = this.props;
    const { disable, votes } = this.state;

    return (
      <React.Fragment>
        {loggedInUser ? (
          <td className="td">
            {comment.votes + votes}
          </td>) : <td className="td">{comment.votes}</td>}
        {loggedInUser ? (
          <td className="td">
            <div>
              <button disabled={votes === 1 || disable} onClick={() => this.handleVote(1)}> like</button>
              <button disabled={votes === -1 || disable} onClick={() => this.handleVote(-1)}> dislike</ button>
            </div>
          </td>) : null}
      </React.Fragment>
    )
  }

  handleVote = (direction) => {
    this.setState({ disable: true });
    const { comment } = this.props;
    patchComment(comment.comment_id, { inc_votes: direction })
      .then(comment => {
        this.setState((prevState) => {
          const newVote = (prevState.votes || 0) + direction;
          return { votes: newVote, disable: false };
        })
      })
  }
}

export default CommentVoting;
