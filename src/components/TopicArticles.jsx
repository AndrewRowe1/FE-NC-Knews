import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticlesList from './ArticlesList';
import { navigate } from '@reach/router';

class TopicArticles extends Component {
  state = { articles: null, loading: true };

  render () {
    const { articles, loading } = this.state;
    return loading ? <p>loading ...</p> : (
      <div>
        <h1>{this.props.topic}</h1>
        {typeof articles !== 'string' ? <ArticlesList articles={articles} /> : null}
      </div>
    );
  }

  componentDidMount () {
    getArticles({ topic: this.props.topic })
      .then((articles) => {
        if (typeof articles === 'string') {
          navigate('/error', { state: { msg: articles }, replace: true });
        } else if (articles.msg !== undefined) {
          navigate('/error', { state: { msg: articles.msg }, replace: true });
        } else {
          this.setState({ articles, loading: false });
        }
      })
      .catch(() => { navigate('/error') })
  }
}

export default TopicArticles;
