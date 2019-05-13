import React, { Component } from 'react';
import { Link } from '@reach/router'
import LogInBox from './LogInBox';

class Header extends Component {

  render () {
    const { logInUser } = this.props.logInUser;
    return (
      <div>
        <Link to='/'>Home </Link>
        <Link to='/articles'>Articles </Link>
        <Link to='/topics'>Topics</Link>
        <br />
        <LogInBox logInUser={logInUser} />
      </div>
    )
  }
}

export default Header;