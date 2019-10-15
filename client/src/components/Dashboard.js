import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  state = { data: '' };

  componentDidMount() {
    axios
      .get('/api/secret')
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
    const { userInfo } = this.props;
    const { name, email, id, role } = userInfo;
    return (
      <div>
        <h1>Dashboard Page</h1>

        <h5>your role is: {role}</h5>
        <h5>your name is: {name}</h5>
        <h5>your email is: {email}</h5>
        <h5>your id is: {id}</h5>
        <p>{data && data}</p>
      </div>
    );
  }
}

export default Dashboard;
