import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Articles from './components/Articles';
import NotFound from './components/NotFound';
import { Router, Link } from '@reach/router';

class App extends Component() {
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
          <NotFound default />
        </Router>
      </div>
    );
  }
  logInUser = username => {
    this.setState({ loggedInUser: username })
  }
}
//<h1>NC News React App</h1>/>

export default App;
