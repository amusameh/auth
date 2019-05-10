import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import Secret from './components/Secret';
import Header from './components/Header';
import Login from './components/Login';

import PrivateRoute from './components/Auth/PrivateRoute';
import LoggedOutRoute from './components/Auth/LoggedoutRoute';

class App extends Component {
  state = {
    isAuthenticated: false,
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/api/check-token')
      .then(() => {
        this.setState({ loading: false, isAuthenticated: true });
      })
      .catch(() => {
        this.setState({ loading: false, isAuthenticated: false });
      });
  }

  updateAuthState = authState => {
    this.setState({ isAuthenticated: authState });
  };

  render() {
    const { loading, isAuthenticated } = this.state;

    if (loading) {
      return <div>Loading ....</div>;
    }
    return (
      <div className="App">
        <h1>App</h1>
        <Router>
          <Header isAuthenticated={isAuthenticated} />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              path="/secret"
              isAuthenticated={isAuthenticated}
              component={Secret}
            />
            <LoggedOutRoute
              path="/login"
              updateAuthState={this.updateAuthState}
              isAuthenticated={isAuthenticated}
              component={Login}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
