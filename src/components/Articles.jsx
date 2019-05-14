import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleList from './ArticleList';
//import { Router, Link } from '@reach/router';

class Articles extends Component {
  state = { articles: null, loading: true };

  render () {
    const { articles, loading } = this.state;
    return loading ? <p>loading ...</p> : (
      <div>
        <button onClick={this.getAuthorsArticles}>get jessjelly article</button>
        <ArticleList articles={articles} />
      </div>
    );
  }

  getAuthorsArticles = () => {
    getArticles({ author: "jessjelly" })
      .then((articles) => {
        console.log(articles, 1)
        this.setState({ articles, loading: false });
      });
  }

  componentDidMount () {
    getArticles()
      .then((articles) => {
        console.log(articles, 2)
        this.setState({ articles, loading: false });
      });
  }
}

export default Articles;