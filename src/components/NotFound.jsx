import React from 'react';

const NotFound = (props) => {
  return (props.uri === '/' || props.uri === '/new-articles') ? null : <h1>not found.....</h1>
}

export default NotFound;