import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Articles from './components/Articles';
import Topics from './components/Topics';
import NotFound from './components/NotFound';
import { Router } from '@reach/router';

class App extends Component {
  state = {
    loggedInUser: ''
  }
  render () {
    const { loggedInUser } = this.state;
    return (
      <div className="App">
        <Header logInUser={this.logInUser} />
        <Router>
          <Articles loggedInUser={loggedInUser} path="/articles" />
          <Topics loggedInUser={loggedInUser} path="/topics" />
          <NotFound default />
        </Router>
      </div>
    );
  }
  logInUser = username => {
    this.setState({ loggedInUser: username })
  }
}

export default App;
