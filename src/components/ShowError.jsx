import React from 'react';
import '../css/ShowError.css';

//function showing html error page
const ShowError = ({ location }) => {
  return (
    <div class="ShowError">
      {location.state ?
        (<h1 class="h1ShowError">Error {location.state.status}</h1>)
        : (<h1 class="h1ShowError">Page not found</h1>)}
      <h2 class="h2ShowError">{location.state.msg}</h2>
    </div>
  )
}

export default ShowError;