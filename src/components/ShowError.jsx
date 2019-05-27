import React from 'react';
import '../ShowError.css';

//function showing html error page
const ShowError = ({ location }) => {
  return (
    <div>
      {location.state ?
        (<h1>Error {location.state.status}</h1>)
        : (<h1>Page not found</h1>)}
      <p>{location.state.msg}</p>
    </div>
  )
}

export default ShowError;