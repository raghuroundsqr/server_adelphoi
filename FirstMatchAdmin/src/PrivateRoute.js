import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
export const PrivateRoute = ({ component: Component, user, ...rest }) => {
 // const { user } = props;
  console.log(Component,'user') 
  if(user.length <= 0 || user.accessToken === ""){
    return (
      <Redirect  to={{
        pathname: "/login",
      }}
    />
     );
  }{
    return(
    <Route
    {...rest}
    render={props =>
      <Component {...props} />
        }/>
        );
  
  }
}
const mapStateToProps = state => ({
  user: state.loginData.user
});
export default connect(mapStateToProps)(PrivateRoute);






   