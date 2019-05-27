import React, { Component } from 'react';
import { patchComment } from '../api';
import '../CommentVoting.css';

class CommentVoting extends Component {
  state = {
    disable: false, votes: 0
  }

  render () {
    const { comment, loggedInUser } = this.props;
    const { disable, votes } = this.state;

    return (
      <React.Fragment>
        <td>
          {comment.votes + votes}
        </td>
        <td>
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
