import React, { Component } from 'react';
import { getUser } from '../api';
import { navigate } from '@reach/router';
import '../css/LoginBox.css';

class LoginBox extends Component {
  state = {
    userNameInput: null,
    error: false
  }
  render () {
    const { loggedInUser } = this.props;
    const { userNameInput, error } = this.state;

    return (!loggedInUser ? (
      <form className="LogInBox" align="center" onSubmit={this.handleSubmit}>
        <input required={true} placeholder="Input username" onChange={this.handleTyping} type="text" />
        <button>Login!</button>
        {(error && userNameInput === null) ? <p>Invalid username! Please login again</p> : null}
      </form>
    )
      : (
        <form className="LogInBox" align="center" onSubmit={this.handleLogout}>
          <button>Logout as {loggedInUser}!</button>
        </form>
      )
    )
  }

  handleTyping = (event) => {
    this.setState({ userNameInput: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    getUser(this.state.userNameInput)
      .then(validUser => {
        this.props.logInUser(validUser.username);
        this.setState({ error: false })
      })
      .catch(() => {
        this.setState({ userNameInput: null, error: true })
      });
  }

  handleLogout = (event) => {
    this.props.logInUser('');
    navigate('/');
  }
}

export default LoginBox;