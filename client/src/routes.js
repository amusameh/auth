import React, { Component } from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';

import { Admin, User, Both } from './components/Authorization';

export default [
  {
    path: '/',
    exact: true,
    component: Home,
    isPrivate: false,
    shouldBeLoggedOut: false,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    isPrivate: false,
    shouldBeLoggedOut: true,
  },
  {
    path: '/signup',
    exact: true,
    component: SignUp,
    isPrivate: false,
    shouldBeLoggedOut: true,
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    isPrivate: true,
    shouldBeLoggedOut: false,
    allowedRoles: ['admin', 'user'],
  },
  {
    path: '/admin',
    exact: true,
    component: Admin,
    isPrivate: true,
    shouldBeLoggedOut: false,
    allowedRoles: ['admin'],
  },
  {
    path: '/user',
    exact: true,
    component: User,
    isPrivate: true,
    shouldBeLoggedOut: false,
    allowedRoles: ['user'],
  },
  {
    path: '/both',
    exact: true,
    component: Both,
    isPrivate: true,
    shouldBeLoggedOut: false,
    allowedRoles: ['user', 'admin'],
  },
  {
    path: '/unauthorized',
    exact: true,
    component: () => <h1>Unauthorized</h1>,
    isPrivate: false,
  },
];
