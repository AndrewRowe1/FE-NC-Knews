import React, { Component } from 'react';
import { getUser } from '../api';

class LoginBox extends Component {
  state = {
    userNameInput: null
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="Input username" onChange={this.handleTyping} type="text" />
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
        console.log(validUser);
        console.log(this.props);
        this.props.logInUser(validUser.username);
      });
  }
}

export default LoginBox;