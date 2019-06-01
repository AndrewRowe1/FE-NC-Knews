import React from 'react';
import { Link } from '@reach/router'
import LogInBox from './LogInBox';
import '../css/Header.css';

const Header = (props) => {
  const { logInUser, loggedInUser } = props;
  return (
    <div className="HeaderLinks">
      <Link className="Links" to='/'>Home </Link>
      <Link className="Links" to='/articles'>Articles </Link>
      <Link className="Links" to='/new-article'>Post New Article </Link>
      <Link className="Links" to='/topics'>Topics</Link>
      <LogInBox loggedInUser={loggedInUser} logInUser={logInUser} />
    </div>
  )
}

export default Header;