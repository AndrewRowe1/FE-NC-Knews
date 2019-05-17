import React, { Component } from 'react';
import { getArticleComments } from '../api';
import ArticleCommentsList from './ArticleCommentsList';
import { navigate } from '@reach/router';

class ArticleComments extends Component {
  state = { comments: null, loading: true };

  render () {
    const { comments, loading } = this.state;
    const { article, handleClick } = this.props;
    return loading ? <p>loading ...</p> : (
      <div key="articleComments">
        <ArticleCommentsList article={article} comments={comments} loggedInUser={this.props.loggedInUser} handleClick={handleClick} />
      </div>
    );
  }

  componentDidMount () {
    const { article_id } = this.props;
    getArticleComments(article_id)
      .then(comments => {
        this.setState({ comments, loading: false })
      })
      .catch(() => { navigate('/error') })
  }
}

export default ArticleComments;