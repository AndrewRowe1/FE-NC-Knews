import React, { Component } from 'react';
import { submitComment } from '../api';

class ArticleCommentsList extends Component {
  state = {
    body: '',
    username: this.props.loggedInUser,
    comments: []
  };

  render () {
    const { username, } = this.state;
    const { loggedInUser } = this.props;

    return (
      <div>
        {(username || loggedInUser) ?
          (<form onSubmit={this.handleSubmit} >
            <span>
              <input required={true} placeholder="body" value={this.state.body} onChange={(event => {
                this.handleChange('body', event.target.value)
              })} />
            </span>
            <button>Submit Comment</button>
          </form>)
          : null}
      </div >
    )
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
        return { comments: [comment, ...prevState.comments], body: '' };
      });
    });
  };

  handleClick = event => {
    this.props.handleClick(true);
  }
}

export default ArticleCommentsList;