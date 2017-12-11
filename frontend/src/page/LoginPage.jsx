import React from 'react';
import {Login} from '../component/container/index';
import PageTemplate from './PageTemplate.jsx';

const LoginPage = () => {
  return (
    <PageTemplate>
      <h1>Login</h1>
        <Login />
    </PageTemplate>
  );
};

export default LoginPage;
