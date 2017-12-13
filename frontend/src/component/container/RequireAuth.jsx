import React, {Component} from "react";
import {hashHistory} from 'react-router'
import {connect} from "react-redux";
import {authenticateAction} from "../../action/action";

const RequireAuth = (ComposedComponent) => {

  class Authentication extends Component {

    componentWillMount() {
      if(!this.props.authenticated) {
        this.props.authenticate();
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        nextProps.authenticate();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return { authenticated: state.user.isAuthenticated };
  };

  const mapDispatchToProps = (dispatch) => {
    return { authenticate: () => dispatch(authenticateAction()) };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
};

export default RequireAuth;