import React from 'react';
import '../css/Landing.css';

const Landing = (props) => {
  const { loggedInUser } = props;
  return (<div class="LandingLinks">
    <h1 class="h1">Welcome to Northcoders News Home Page</h1>
    {!loggedInUser ? (
      <div>
        <h2 class="h2Land">Please log in using your username</h2>
        <p class="pLand">The suggested default username is 'jessjelly'</p>
      </div>) : null}
  </div>
  )
}

export default Landing;