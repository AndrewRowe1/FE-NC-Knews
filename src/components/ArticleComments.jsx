import React, { Component } from 'react';
import { getArticleComments, submitComment, deleteComment } from '../api';
import FormatDate from './FormatDate';
import CommentVoting from './CommentVoting';

class ArticleComments extends Component {
  state = {
    body: '', comments: [], loading: true, disable: false, p: 1, comment_count: 0
  };

  render () {
    const { body, comments, loading, disable, p, comment_count } = this.state;
    const { article, loggedInUser } = this.props;
    return loading ? <p>loading ...</p> : (
      <div key="articleComments">
        <div>
          {loggedInUser ?
            (<form disabled={disable} onSubmit={this.handleSubmit} >
              <span>
                <input required={true} placeholder="body" value={body} onChange={(event => {
                  this.handleChange('body', event.target.value)
                })} />
              </span>
              <button>Submit Comment</button>
            </form>)
            : null}
          <button disabled={p === Math.ceil(comment_count / 10)} onClick={() => { this.changePage(1) }} > More Articles</button >
          <button disabled={this.state.p === 1} onClick={() => { this.changePage(-1) }} >Previous Articles</button>
        </div >
        {article.article_id > 0 ? (
          <div>
            <table>
              <tbody>
                <tr key="commentHeaders" className="articleCommentsList">
                  <th>Author</th>
                  <th>Created At</th>
                  <th>Body</th>
                  <th>Votes</th>
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
                      <td>
                        <div>
                          <FormatDate dateToFormat={comment.created_at} />
                        </div>
                      </td>
                      <td>{comment.body}</td>
                      <CommentVoting comment={comment} loggedInUser={loggedInUser} />
                      <td>
                        {loggedInUser === comment.author ?
                          (<button onClick={() => this.handleDelete(comment.comment_id)}>
                            Delete Comment
                            </button>)
                          : null}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div >)
          : <p>No comments available to display</p>}
      </div>
    );
  }

  componentDidMount () {
    const { article_id, comment_count } = this.props.article;
    getArticleComments(article_id)
      .then(comments => {
        this.setState({ comments, loading: false, comment_count })
      })
  }

  componentDidUpdate (prevProps, prevState) {
    const { loggedInUser } = this.props;
    if (prevProps.loggedInUser !== loggedInUser) {
      this.setState({ voting: [] });
    }
    if (prevState.p !== this.state.p) {
      const { article_id, comment_count } = this.props.article;
      getArticleComments(article_id, { p: this.state.p })
        .then((comments) => {
          this.setState({ comments, loading: false, comment_count });
        });
    }
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ disable: true });
    const { article, loggedInUser } = this.props;
    const { body, } = this.state;
    submitComment({ article_id: article.article_id }, { username: loggedInUser, body }).then(comment => {
      this.setState((prevState) => {
        return { comments: [comment, ...prevState.comments], body: '', disable: false };
      });
    });
  };

  /*handleClick = event => {
    this.props.handleClick(true);
  }*/

  handleDelete = commentId => {
    deleteComment(commentId).then(comment => {
      const { comments } = this.state;
      const filtered = comments.filter(element => {
        return element.comment_id !== commentId
      })
      this.setState({ comments: filtered });
    });
  }

  changePage = direction => {
    this.setState(prevState => {
      return { p: prevState.p + direction };
    })
  }

}

export default ArticleComments;
