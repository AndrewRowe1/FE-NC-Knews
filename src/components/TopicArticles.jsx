import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticlesList from './ArticlesList';
//import { Router, Link } from '@reach/router';

class TopicArticles extends Component {
  state = { articles: null, loading: true };

  render () {
    const { articles, loading } = this.state;
    return loading ? <p>loading ...</p> : (
      <div>
        <h1>{this.props.topic}</h1>
        <ArticlesList articles={articles} />
      </div>
    );
  }

  componentDidMount () {
    getArticles({ topic: this.props.topic })
      .then((articles) => {
        this.setState({ articles, loading: false });
      });
  }
}

export default TopicArticles;