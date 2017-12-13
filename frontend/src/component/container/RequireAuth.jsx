import React, {Component} from "react";
import {hashHistory} from 'react-router'
import {connect} from "react-redux";

const RequireAuth = (ComposedComponent) => {

  class Authentication extends Component {

    componentWillMount() {
      if(!this.props.authenticated) {
        hashHistory.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        hashHistory.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return { authenticated: state.user.isAuthenticated };
  };

  return connect(mapStateToProps)(Authentication);
};

export default RequireAuth;