import React from 'react';

const NotFound = (props) => {
  return props.uri !== '/' ? <h1>not found.....</h1> : null
}

export default NotFound;