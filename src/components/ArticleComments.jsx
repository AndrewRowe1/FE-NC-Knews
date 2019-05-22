import React, { Component } from 'react';
import { getArticleComments, submitComment, deleteComment } from '../api';
import FormatDate from './FormatDate';
import CommentVoting from './CommentVoting';

class ArticleComments extends Component {
  state = {
    body: '', comments: [], loading: true, disable: false
  };

  render () {
    const { body, comments, loading, disable } = this.state;
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
                      <CommentVoting comment={comment} commentId={comment.comment_id} loggedInUser={loggedInUser} />
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
  /*             <div onClick={this.handleClick}>
              <Link to={`/articles/${article.article_id}`} >Go back to article</Link>
            </div>
  */

  /*<button disabled={this.aggregateVoting(comment.comment_id, voting) === 1 || disable} onClick={() => this.handleVote(comment.comment_id, 1)}> like</button>
                              <button disabled={this.aggregateVoting(comment.comment_id, voting) === -1 || disable} onClick={() => this.handleVote(comment.comment_id, -1)}> dislike</ button>
                              */

  /*<ArticleCommentsList article={article} comments={comments} loggedInUser={this.props.loggedInUser} handleClick={handleClick} />*/

  componentDidMount () {
    const { article_id } = this.props.article;
    getArticleComments(article_id)
      .then(comments => {
        this.setState({ comments, loading: false })
      })
  }

  componentDidUpdate (prevProps) {
    const { loggedInUser } = this.props;
    if (prevProps.loggedInUser !== loggedInUser) {
      this.setState({ voting: [] });
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

}

export default ArticleComments;