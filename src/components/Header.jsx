import React, { Component } from 'react';
import { Link } from '@reach/router'
import LogInBox from './LogInBox';

class Header extends Component {

  render () {
    const { logInUser } = this.props;
    return (
      <div>
        <Link to='/'>Home </Link>
        <Link to='/articles'>Articles </Link>
        <Link to='/new-article'>Post New Article </Link>
        <Link to='/topics'>Topics</Link>
        <br />
        <LogInBox loggedInUser={this.props.loggedInUser} logInUser={logInUser} />
      </div>
    )
  }
}

export default Header;