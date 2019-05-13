import React, { Component } from 'react';
import { Router, Link } from '@reach/router'
import LogInBox from './LogInBox';

class Header extends Component {
  render () {
    return (
      <div ClassName="App-header">
        <Link to='/'>Home</Link>
        <Link to='/articles'>Articles</Link>
        <Link to='/topics'>Topics</Link>
      </div>
      <div>
        <LogInBox />
      </div>
    )
  }
}

export default Header;