import React, { Component } from 'react';
import { getArticleComments } from '../api';
import ArticleCommentsList from './ArticleCommentsList';

class ArticleComments extends Component {
  state = { comments: null, loading: true };

  render () {
    const { comments, loading } = this.state;
    const { article } = this.props;
    return loading ? <p>loading ...</p> : (
      <div key="articleComments">
        <ArticleCommentsList article={article} comments={comments} loggedInUser={this.props.loggedInUser} />
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