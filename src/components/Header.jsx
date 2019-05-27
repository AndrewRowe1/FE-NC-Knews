import React from 'react';
import { Link } from '@reach/router'
import LogInBox from './LogInBox';
import '../css/Header.css';

const Header = (props) => {
  const { logInUser, loggedInUser } = props;
  return (
    <div class="HeaderLinks">
      <Link class="Links" to='/'>Home </Link>
      <Link class="Links" to='/articles'>Articles </Link>
      <Link class="Links" to='/new-article'>Post New Article </Link>
      <Link class="Links" to='/topics'>Topics</Link>
      <br />
      <LogInBox class="LogInBox" loggedInUser={loggedInUser} logInUser={logInUser} />
    </div>
  )
}

export default Header;