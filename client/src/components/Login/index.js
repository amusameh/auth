import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    const { updateAuthState, history } = this.props;
    e.preventDefault();
    axios
      .post('/api/login', this.state)
      .then(() => {
        updateAuthState(true);
        history.push('/');
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log('err', err);
        // how to handle this the best way??!!!
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  updateAuthState: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.any.isRequired,
};

export default Login;
