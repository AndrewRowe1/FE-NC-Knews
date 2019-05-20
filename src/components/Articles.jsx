import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticlesList from './ArticlesList';

class Articles extends Component {
  state = { articles: null, loading: true, sort: null };

  render () {
    const { articles, loading, sort } = this.state;
    const sortMethods = ['created_at', 'comment_count', 'votes'];
    return loading ? <p>loading ...</p> : (
      <div>
        {sortMethods.map((sorting) => {
          return <button disabled={sort === sorting} key={`sort by ${sorting}`} onClick={() => { this.sortArticles(sorting) }}>Sort Articles by {sorting === 'created_at' ? 'date' : sorting} </button>
        })}
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
