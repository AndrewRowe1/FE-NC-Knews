import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { submitComment } from '../api';

class ArticleCommentsList extends Component {
  state = {
    body: null,
    author: this.props.loggedInUser
  };

  render () {
    const { comments } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <span>
            <textarea required={true} placeholder="body" onChange={(event => { this.handleChange('body', event.target.value) })} />
          </span>
          <button >Submit Comment</button>
        </form>
        <table>
          <tbody>
            <tr className="articleCommentsList">
              <th>Author</th>
              <th>Comment ID</th>
              <th>Article ID</th>
              <th>Votes</th>
              <th>Created At</th>
              <th>Body</th>
            </tr>
            {comments.map((comment) => {
              return (
                <tr>
                  <td>{comment.author}</td>
                  <td>{comment.comment_id}</td>
                  <td>{comment.article_id}</td>
                  <td>{comment.votes}</td>
                  <td>{comment.created_at}</td>
                  <td>{comment.body}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value, author: this.props.loggedInUser });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { article } = this.props;
    //I've clicked stop more clicking
    submitComment({ article_id: article.article_id }, this.state).then(comment => {
      navigate(`/articles/${article.article_id}/comments`, { state: { new: true } })
    });
  };
}

export default ArticleCommentsList;