import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

  state = {
    email: "",
    password: "",
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  // onSubmit = (e) => {
  //   e.preventDefault();
  //   fetch('/api/login', {
  //     method: 'POST',
  //     body: JSON.stringify(this.state),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(res => {
  //     console.log('resss', res);
  //     if (res.status === 200) {
  //       this.props.history.push('/');
  //     } else {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     alert('Error logging in please try again');
  //   });
  // }

  handleSubmit = (e) => {
    const { updateAuthState } = this.props;
    e.preventDefault();
    console.log('submitted', this.state);
    axios.post('/api/login', this.state)
      .then(user => {
        console.log('user', updateAuthState);
        updateAuthState(true);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log('err', err);
        // how to handle this the best way??!!!
      })
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="email" name="email" onChange={this.handleChange} value={email} />
          </div>
          <div>
            <input type="password" name="password" onChange={this.handleChange} value={password} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login;
