import React, { Component } from 'react';
import axios from 'axios';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    state = { loading: true };

    componentDidMount() {
      // eslint-disable-next-line react/prop-types
      const { history } = this.props;
      axios
        .get('/api/check-token')
        .then(() => {
          this.setState({ loading: false });
        })
        .catch(() => {
          this.setState({ loading: false });
          history.push('/login');
        });
    }

    render() {
      const { loading } = this.state;
      if (loading) {
        return <div>Loading....</div>;
      }

      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}
