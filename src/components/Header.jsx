import React from 'react';
import { Link } from '@reach/router'
import LogInBox from './LogInBox';

const Header = (props) => {
  const { logInUser, loggedInUser } = props;
  return (
    <div>
      <Link to='/'>Home </Link>
      <Link to='/articles'>Articles </Link>
      <Link to='/new-article'>Post New Article </Link>
      <Link to='/topics'>Topics</Link>
      <br />
      <LogInBox loggedInUser={loggedInUser} logInUser={logInUser} />
    </div>
  )
}

export default Header;