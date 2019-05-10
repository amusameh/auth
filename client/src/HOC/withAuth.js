import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    state = { loading: true }

    componentDidMount() {
      axios.get('/api/check-token')
        .then(res => {
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({ loading: false });
          this.props.history.push('/login');
        })
    }

    render() {
      const { loading } = this.state;
      if (loading) {
        return <div>Loading....</div>
      }

      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      )
    }
  }
}