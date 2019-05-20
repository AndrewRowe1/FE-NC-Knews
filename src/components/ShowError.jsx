import React from 'react';

//function showing html error page
const ShowError = ({ location }) => {
  console.log(location.state)
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