import React, {PropTypes} from "react";
import {translate} from "react-i18next";

const UserInfo = ({user, onLogout = f => f, t = f => f}) => {
    if (!user.doctor) {
        return <span/>;
    }
    return <span className="user">
          <span>{user.doctor.firstName}</span>
          <span>{user.doctor.lastName}</span>
      <span className="actions">
        <a onClick={(e) => {
            e.preventDefault();
            onLogout();
        }}>{t('Logout')}</a>
      </span>
  </span>
};

UserInfo.propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default translate()(UserInfo);

