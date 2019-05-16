import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Articles from './components/Articles';
import Article from './components/Article';
import NewArticleForm from './components/NewArticleForm';
import Topics from './components/Topics';
import TopicArticles from './components/TopicArticles';
import ShowError from './components/ShowError';
import NotFound from './components/NotFound';
import { Router } from '@reach/router';
import { getTopics } from './api';

class App extends Component {
  state = {
    loggedInUser: '',
    topics: null
  }

  render () {
    const { loggedInUser, topics } = this.state;
    return (
      <div className="App">
        <Header loggedInUser={loggedInUser} logInUser={this.logInUser} />
        <Router>
          <Articles loggedInUser={loggedInUser} path="/articles" />
          <Article loggedInUser={loggedInUser} path="/articles/:article_id/*" />
          <NewArticleForm loggedInUser={loggedInUser} path="/new-article" topics={topics} />
          <Topics loggedInUser={loggedInUser} path="/topics" />
          <TopicArticles loggedInUser={loggedInUser} path="/topics/:topic" />
          <ShowError default path="/error" />
          <NotFound default />
        </Router>
      </div>
    );
  }

  logInUser = username => {
    this.setState({ loggedInUser: username })
  }

  componentDidMount () {
    getTopics()
      .then((topics) => {
        this.setState({ topics });
      });
  }
}

export default App;
