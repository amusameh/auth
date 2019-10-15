import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';

import PrivateRoute from './components/Auth/PrivateRoute';
import LoggedOutRoute from './components/Auth/LoggedoutRoute';

class App extends Component {
  state = {
    isAuthenticated: false,
    loading: true,
    email: null,
    id: null,
    name: null,
  };

  componentDidMount() {
    axios
      .get('/api/check-token')
      .then(({ data: userInfo }) => {
        this.setState({
          loading: false,
          isAuthenticated: true,
          ...userInfo,
        });
      })
      .catch(() => {
        this.setState({ loading: false, isAuthenticated: false });
      });
  }

  updateAuthState = userInfo => {
    this.setState({ isAuthenticated: true, ...userInfo });
  };

  render() {
    const { loading, isAuthenticated, name, email, id } = this.state;

    if (loading) {
      return <div>Loading ....</div>;
    }

    return (
      <div className="App">
        <Router>
          <Header isAuthenticated={isAuthenticated} name={name} />
          <Switch>
            <Route exact path="/" component={Home} />

            <PrivateRoute
              path="/dashboard"
              isAuthenticated={isAuthenticated}
              component={Dashboard}
              userInfo={{ email, id, name }}
            />

            <LoggedOutRoute
              path="/login"
              handleLoginSuccess={this.updateAuthState}
              isAuthenticated={isAuthenticated}
              component={Login}
            />

            <LoggedOutRoute
              path="/signup"
              handleLoginSuccess={this.updateAuthState}
              isAuthenticated={isAuthenticated}
              component={SignUp}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
