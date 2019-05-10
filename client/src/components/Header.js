import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    const { isAuthenticated } = this.props;
    console.log('isAuth', isAuthenticated);
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          { !isAuthenticated && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          <li>
            <Link to="/secret">Secret</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Header;
