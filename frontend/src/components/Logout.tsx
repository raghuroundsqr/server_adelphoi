/** @jsx jsx */
import React,{ useState, useEffect } from "react";
import { connect } from "react-redux";
import { jsx, css } from "@emotion/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { AppState } from "../redux-modules/root";
import * as user from "../redux-modules/user";


export interface LogoutProps {
  appState: AppState;
  logout: () => void;
  
}
const Logout: React.FC<LogoutProps> = props => {
  const user = props.appState.user;
  const history = useHistory();
  const {  logout } = props;
  useEffect(() => {
    console.log("logout")
    logout();
    history.push("/adelphoi/login");
  });
  console.log(logout,"log")
  const onLogoutClick = () => {
    console.log("logout")
    logout();
    history.push("/adelphoi/login");
  };
  return (
    <div>
      
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user,
    appState: state
  };
};

const mapDispatchToProps = {
  logout: user.actions.logout,
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

