import React, { Component } from 'react';
import getArticles from '../api';
import ArticleList from './ArticleList';
import Articles from '.component/Articles';
import { Router, Link } from '@reach/router';

class Articles extends Component {
  state = { articles: null, loading: true };

  render () {
    const { articles, loading } = this.state;
    return loading ? <p>loading ...</p> : (
      <div>
        <button onClick={this.getAuthorsArticles}>get jessjelly article</button>
        <ul>
          {articles.map((article) => {
            return <li key={article.article_id}>{article.title}</li>
          })}
        </ul>
      </div>

    );
  }

  getAuthorsArticles = () => {
    getArticles({ author: 'jessjelly' }).then((articles) => {
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