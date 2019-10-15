import React, { Component } from 'react';
import axios from 'axios';

import {
  FormWrapper,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from './Login.style';

export default class Login extends Component {
  state = {
    email: null,
    password: null,
    err: null,
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { handleLoginSuccess } = this.props;
    try {
      const { data } = await axios.post('/api/login', { email, password });
      return handleLoginSuccess(data);
    } catch (error) {
      if (error.isAxiosError) {
        const { message } = error.response.data;
        return this.setState({ err: message });
      }
      return this.setState({ err: 'error' });
    }
  };

  render() {
    const { err } = this.state;
    return (
      <>
        <h1>Login Page</h1>

        <FormWrapper>
          <Form name="loginForm" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">
                Email
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.handleInputChange}
                  required
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">
                Password
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleInputChange}
                  required
                />
              </Label>
            </FormGroup>
            {err && <p>{err}</p>}
            <Button type="submit">LogIn</Button>
          </Form>
        </FormWrapper>
      </>
    );
  }
}
