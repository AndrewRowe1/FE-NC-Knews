import React from 'react';
import '../Landing.css';

const Landing = (props) => {
  const { loggedInUser } = props;
  return (<div>
    <h1>Welcome to Northcoders News Home Page</h1>
    {!loggedInUser ? (
      <div>
        <h2>Please login using your username</h2>
        <p>The suggested default username is 'jessjelly'</p>
      </div>) : null}
  </div>
  )
}

export default Landing;