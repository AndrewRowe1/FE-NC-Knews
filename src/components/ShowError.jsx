import React from 'react';

//function showing html error page

const ShowError = ({ location }) => {
  //props.location.state
  return (
    <div>
      {location.state ? (<h1>oops {location.state.status}</h1>) : (<h1>Page not found</h1>)}
      <p>{location.state && location.state.msg}</p>)
    </div>
  )
}

export default ShowError;