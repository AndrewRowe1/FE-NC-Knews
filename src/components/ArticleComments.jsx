import React, { Component } from 'react';
import { getArticleComments } from '../api';
import ArticleCommentsList from './ArticleCommentsList';

class ArticleComments extends Component {
  state = { comments: null, loading: true };

  render () {
    const { comments, loading } = this.state;
    return loading ? <p>loading ...</p> : (
      <div key="articleComments">
        <ArticleCommentsList comments={comments} />
      </div>
    );
  }

  componentDidMount () {
    const { article_id } = this.props;
    getArticleComments(article_id)
      .then(comments => {
        this.setState({ comments, loading: false })
      });
  }
}

export default ArticleComments;