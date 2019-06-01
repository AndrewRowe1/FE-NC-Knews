import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticlesList from './ArticlesList';
import '../css/Articles.css';

class Articles extends Component {
  state = { articles: null, loading: true, sort: null, p: 1, total_count: 0 };

  render () {
    console.log('articles render')
    const { articles, loading, sort, p, total_count } = this.state;
    const { loggedInUser } = this.props;
    const sortMethods = ['created_at', 'comment_count', 'votes'];
    return loading ? <p>loading ...</p> : (
      <div className="Articles">
        {sortMethods.map((sorting) => {
          return <button disabled={sort === sorting} key={`sort by ${sorting}`} onClick={() => { this.sortArticles(sorting) }}>Sort Articles by {sorting === 'created_at' ? 'date' : sorting} </button>
        })}
        {sort ? <p>Articles sorted by {sort === 'created_at' ? 'date' : sort}</p> : <p>Articles not sorted</p>}
        <button disabled={p === Math.ceil(total_count / 10)} onClick={() => { this.changePage(1) }} > More Articles</button >
        <button disabled={this.state.p === 1} onClick={() => { this.changePage(-1) }} >Previous Articles</button>
        <ArticlesList loggedInUser={loggedInUser} articles={articles} />
      </div>);
  };

  componentDidMount () {
    getArticles()
      .then((articles) => {
        const { total_count } = articles[0];
        this.setState({ articles, loading: false, total_count });
      });
  }

  componentDidUpdate (prevProps, prevState) {
    const { sort } = this.state;
    if (prevState.p !== this.state.p) {
      getArticles({ sort_by: sort, p: this.state.p })
        .then((articles) => {
          const { total_count } = articles[0];
          this.setState({ articles, loading: false, total_count });
        });
    }
    else if (prevState.sort !== this.state.sort) {
      getArticles({ sort_by: sort, p: 1 })
        .then((articles) => {
          const { total_count } = articles[0];
          this.setState({ articles, loading: false, total_count, p: 1 });
        });
    }
  }

  sortArticles = (sort) => {
    getArticles({ sort_by: sort, p: this.state.p })
      .then((articles) => {
        this.setState({ articles, loading: false, sort });
      });
  }

  changePage = direction => {
    this.setState(prevState => {
      return { p: prevState.p + direction };
    })
  }
}

export default Articles;
