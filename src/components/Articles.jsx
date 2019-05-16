import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticlesList from './ArticlesList';

class Articles extends Component {
  state = { articles: null, loading: true };

  render () {
    const { articles, loading } = this.state;
    return loading ? <p>loading ...</p> : (
      <div>
        <button key="sort_by_date" onClick={() => { this.sortArticles('created_at') }}>Sort Articles by Date</button>
        <button key="sort_by_comment_count" onClick={() => { this.sortArticles('comment_count') }}>Sort Articles by Comment Count</button>
        <button key="sort_by_votes" onClick={() => { this.sortArticles('votes') }}>Sort Articles by Votes</button>
        <ArticlesList articles={articles} />
      </div>
    );
  };

  sortArticles = (sort) => {
    getArticles({ sort_by: sort })
      .then((articles) => {
        this.setState({ articles, loading: false });
      });
  }

  componentDidMount () {
    getArticles()
      .then((articles) => {
        this.setState({ articles, loading: false });
      });
  }
}

export default Articles;