import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticlesList from './ArticlesList';

class Articles extends Component {
  state = { articles: null, loading: true, sort: null };

  render () {
    const { articles, loading, sort } = this.state;
    return loading ? <p>loading ...</p> : (
      <div>
        <button disabled={sort === 'created_at'} key="sort_by_date" onClick={() => { this.sortArticles('created_at') }}>Sort Articles by Date</button>
        <button disabled={sort === 'comment_count'} key="sort_by_comment_count" onClick={() => { this.sortArticles('comment_count') }}>Sort Articles by Comment Count</button>
        <button disabled={sort === 'votes'} key="sort_by_votes" onClick={() => { this.sortArticles('votes') }}>Sort Articles by Votes</button>
        {sort ? <p>Articles sorted by {sort === 'created_at' ? 'date' : sort}</p> : null}
        <ArticlesList articles={articles} />
      </div>
    );
  };

  sortArticles = (sort) => {
    getArticles({ sort_by: sort })
      .then((articles) => {
        this.setState({ articles, loading: false, sort });
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
