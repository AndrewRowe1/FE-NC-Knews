import React, { Component } from 'react';
import { getUser } from '../api';

class LoginBox extends Component {
  state = {
    userNameInput: null
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={handleTyping} type="text" />
        <button>Login!</button>
      </form>
    )
  }
  handleTyping = (event) => {
    this.setState({ userNameInput: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    getUser(this.state.userNameInput)
      .then(validUser => {
        this.props.logInUser(validUser);
      });

  }
}

export default LoginBox;