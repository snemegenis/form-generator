import React from 'react';
import theme from 'reapop-theme-bootstrap';
import NotificationsSystem from 'reapop';

const PageTemplate = ({children}) =>
  <div className="page">
    <NotificationsSystem theme={theme}/>
    {children}
  </div>;

export default PageTemplate;