import React, { Component } from 'react';
import { getArticleComments, submitComment, deleteComment } from '../api';
import { navigate, Link } from '@reach/router';
import FormatDate from './FormatDate';
import CommentVoting from './CommentVoting';

class ArticleComments extends Component {
  state = {
    body: '', comments: [], loading: true, voting: [], disable: false
  };

  render () {
    const { body, comments, loading, voting, disable } = this.state;
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
        {article.comment_count > 0 ? (
          <div>
            <div onClick={this.handleClick}>
              <Link to={`/articles/${article.article_id}`} >Go back to article</Link>
            </div>
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
                          <FormatDate dateToFormat={article.created_at} />
                        </div>
                      </td>
                      <td>{comment.body}</td>
                      <CommentVoting comment={comment} commentId={comment.comment_id} voting={voting} loggedInUser={loggedInUser} />
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

  /*<button disabled={this.aggregateVoting(comment.comment_id, voting) === 1 || disable} onClick={() => this.handleVote(comment.comment_id, 1)}> like</button>
                              <button disabled={this.aggregateVoting(comment.comment_id, voting) === -1 || disable} onClick={() => this.handleVote(comment.comment_id, -1)}> dislike</ button>
                              */

  /*<ArticleCommentsList article={article} comments={comments} loggedInUser={this.props.loggedInUser} handleClick={handleClick} />*/

  componentDidMount () {
    const { article_id } = this.props;
    getArticleComments(article_id)
      .then(comments => {
        //this.setState({ comments, loading: false })
        this.setState({ comments, loading: false, voting: [] })
      })
      .catch(() => { navigate('/error') })
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

  handleClick = event => {
    this.props.handleClick(true);
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

}

export default ArticleComments;