import React, {PropTypes} from "react";
import {translate} from "react-i18next";
import {Glyphicon, MenuItem, Nav, Navbar, NavDropdown} from "react-bootstrap";

const UserInfo = ({user, onLogout = f => f, t = f => f}) => {
    if (!user.doctor) {
        return <span/>;
    }

  return <Navbar.Collapse>
    <Nav pullRight>
      <NavDropdown eventKey={1} title={user.doctor.firstName+" "+user.doctor.lastName} id="basic-nav-dropdown">
        <MenuItem eventKey={1.1} onClick={onLogout}><Glyphicon glyph="log-out"/> {t('Logout')}</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>;
};

UserInfo.propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default translate()(UserInfo);

