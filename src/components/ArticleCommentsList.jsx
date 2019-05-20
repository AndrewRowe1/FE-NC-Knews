import React, { Component } from 'react';
import { Link } from '@reach/router';
import { submitComment, patchComment, deleteComment } from '../api';

class ArticleCommentsList extends Component {
  state = {
    body: '',
    username: this.props.loggedInUser,
    comments: [],
    voting: [],
    disable: false
  };

  render () {
    const { comments, username, voting, disable } = this.state;
    const { article, loggedInUser } = this.props;

    return (
      <div>
        {(username || loggedInUser) ? (<form onSubmit={this.handleSubmit} >
          <span>
            <textarea required={true} placeholder="body" value={this.state.body} onChange={(event => {
              this.handleChange('body', event.target.value)
            })} />
          </span>
          <button>Submit Comment</button>
        </form>) : null}
        <div onClick={this.handleClick}>
          <Link to={`/articles/${article.article_id}`} >Go back to article</Link>
        </div>
        <table>
          <tbody>
            <tr key="commentHeaders" className="articleCommentsList">
              <th>Author</th>
              <th>Votes</th>
              <th>Created At</th>
              <th>Body</th>
              <th>
                {loggedInUser ? <div>Vote on Comment</div> : null}
              </th>
              <th>
                {loggedInUser ? <div>Delete Comment</div> : null}
              </th>
            </tr>
            {comments.map((comment) => {
              return (
                <tr key={comment.comment_id}>
                  <td>{comment.author}</td>
                  <td>{comment.votes + (this.aggregateVoting(comment.comment_id, voting) || 0)}</td>
                  <td>{comment.created_at}</td>
                  <td>{comment.body}</td>
                  <td>
                    {loggedInUser ? (
                      <div>
                        <button disabled={this.aggregateVoting(comment.comment_id, voting) === 1 || disable} onClick={() => this.handleVote(comment.comment_id, 1)}> like</button>
                        <button disabled={this.aggregateVoting(comment.comment_id, voting) === -1 || disable} onClick={() => this.handleVote(comment.comment_id, -1)}> dislike</ button>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {loggedInUser === comment.author ?
                      <button onClick={() => this.handleDelete(comment.comment_id)}>
                        Delete Comment
                      </button>
                      : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div >
    )
  }

  aggregateVoting = (commentId, voteArray) => {
    let votes = 0;
    for (let i = 0; i < voteArray.length; i++) {
      if (+Object.keys(voteArray[i])[0] === commentId) {
        votes += (voteArray[i])[commentId];
      }
    }
    return votes;
  }

  handleDelete = commentId => {
    deleteComment(commentId).then(comment => {
      const { comments } = this.state;
      const filtered = comments.filter(element => {
        return element.comment_id !== commentId
      })
      this.setState({ comments: filtered });
    });
  }

  componentDidMount () {
    const { comments } = this.props;
    this.setState({ comments, voting: [] });
  }

  componentDidUpdate (prevProps) {
    const { loggedInUser } = this.props;
    if (prevProps.loggedInUser !== loggedInUser) {
      this.setState({ voting: [] });
    }
  }

  handleVote = (commentId, direction) => {
    this.setState({ disable: true });
    patchComment(commentId, { inc_votes: direction })
      .then(comment => {
        this.setState((prevState) => {
          const newVote = (prevState.voting.commentId || 0) + direction;
          const newVoting = { [commentId]: newVote };
          return { voting: [...prevState.voting, newVoting], disable: false };
        })
      })
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value, username: this.props.loggedInUser });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { article } = this.props;
    //I've clicked stop more clicking
    submitComment({ article_id: article.article_id }, this.state).then(comment => {
      this.setState((prevState) => {
        return { comments: [comment, ...prevState.comments], body: '' };
      });
    });
  };

  handleClick = event => {
    this.props.handleClick(true);
  }
}

export default ArticleCommentsList;