import React, { Component } from 'react';
import { Link } from '@reach/router';
import { submitComment, deleteComment } from '../api';

class ArticleCommentsList extends Component {
  state = {
    body: null,
    username: this.props.loggedInUser,
    comments: []
  };

  render () {
    const { comments, username } = this.state;
    const { article, loggedInUser } = this.props;
    return (
      <div>
        {(username || loggedInUser) ? (<form onSubmit={this.handleSubmit} >
          <span>
            <textarea required={true} placeholder="body" onChange={(event => { this.handleChange('body', event.target.value) })} />
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
              <th>Comment ID</th>
              <th>Article ID</th>
              <th>Votes</th>
              <th>Created At</th>
              <th>Body</th>
              <th>Delete Comment</th>
            </tr>
            {comments.map((comment) => {
              console.log(username);
              return (
                <tr key={comment.comment_id}>
                  <td>{comment.author}</td>
                  <td>{comment.comment_id}</td>
                  <td>{comment.article_id}</td>
                  <td>{comment.votes}</td>
                  <td>{comment.created_at}</td>
                  <td>{comment.body}</td>
                  <td>
                    {username === comment.author ?
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
    this.setState({ comments });
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
        return { comments: [...prevState.comments, comment] };
      });
    });
  };

  handleClick = event => {
    this.props.handleClick(true);
  }
}

export default ArticleCommentsList;