import React, { Component } from 'react';
import { patchComment } from '../api';

class CommentVoting extends Component {

  state = {
    votes: 0, disable: false
  }

  render () {
    const { comment, loggedInUser } = this.props;
    const { disable, votes } = this.state;
    return (
      <div>
        <td>{comment.votes + votes}</td>
        <td>
          {loggedInUser ? (
            <div>
              <button disabled={votes === 1 || disable} onClick={() => this.handleVote(1)}> like</button>
              <button disabled={votes === -1 || disable} onClick={() => this.handleVote(-1)}> dislike</ button>
            </div>) : null}
        </td>
      </div>
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