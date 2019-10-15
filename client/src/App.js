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

import routes from './routes';

class App extends Component {
  state = {
    isAuthenticated: false,
    loading: true,
    email: null,
    id: null,
    name: null,
    role: null,
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
    const { loading, isAuthenticated, name, email, id, role } = this.state;

    if (loading) {
      return <div>Loading ....</div>;
    }

    return (
      <div className="App">
        <Router>
          <Header isAuthenticated={isAuthenticated} name={name} />
          <Switch>
            {routes.map(route => {
              const {
                path,
                exact,
                component,
                isPrivate,
                shouldBeLoggedOut,
                allowedRoles,
              } = route;
              console.log({ route });
              if (isPrivate) {
                return (
                  <PrivateRoute
                    path={path}
                    exact={exact}
                    component={component}
                    allowedRoles={allowedRoles}
                    isAuthenticated={isAuthenticated}
                    userInfo={{ email, id, name, role }}
                    role={role}
                  />
                );
              }
              if (shouldBeLoggedOut) {
                return (
                  <LoggedOutRoute
                    path={path}
                    exact={exact}
                    component={component}
                    allowedRoles={allowedRoles}
                    handleLoginSuccess={this.updateAuthState}
                    isAuthenticated={isAuthenticated}
                  />
                );
              }
              return <Route path={path} exact={exact} component={component} />;
            })}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
