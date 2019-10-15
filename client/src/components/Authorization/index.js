/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import axios from 'axios';

export class Admin extends Component {
  state = { data: '' };

  componentDidMount() {
    axios
      .get('/api/admin')
      .then(res => {
        this.setState({
          data: res.data.msg,
        });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('err', err);
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>Admin Page</h1>
        <p>{data && data}</p>
      </div>
    );
  }
}

export class User extends Component {
  state = { data: '' };

  componentDidMount() {
    axios
      .get('/api/user')
      .then(res => {
        this.setState({
          data: res.data.msg,
        });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('err', err);
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>User Page</h1>
        <p>{data && data}</p>
      </div>
    );
  }
}

export class Both extends Component {
  state = { data: '' };

  componentDidMount() {
    axios
      .get('/api/both')
      .then(res => {
        this.setState({
          data: res.data.msg,
        });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('err', err);
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>Both Page</h1>
        <p>{data && data}</p>
      </div>
    );
  }
}
