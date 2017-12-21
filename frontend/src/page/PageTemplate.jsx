import React from 'react';
import theme from 'reapop-theme-bootstrap';
import NotificationsSystem from 'reapop';
import {UserInfoView} from "../component/container/index";

const PageTemplate = ({children}) =>
    <div class="panel panel-default">
    <NotificationsSystem theme={theme}/>
    <UserInfoView />
    {children}
  </div>;

export default PageTemplate;