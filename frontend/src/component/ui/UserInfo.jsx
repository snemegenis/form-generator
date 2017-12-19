import React, {PropTypes} from "react";
import {translate} from "react-i18next";

const UserInfo = ({user, onLogout = f => f, t = f => f}) => {
    if (!user.doctor) {
        return <span/>;
    }
    return <div className="user float-right">
          <span className="user-first-name">{user.doctor.firstName}</span>
          <span className="user-last-name">{user.doctor.lastName}</span>
      <span className="actions">
        <button className="btn btn-default" onClick={() => {
            onLogout();
        }}>{t('Logout')}</button>
      </span>
  </div>
};

UserInfo.propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default translate()(UserInfo);

