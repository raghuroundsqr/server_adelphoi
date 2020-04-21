/** @jsx jsx */
import React from "react";
import { SnackbarProvider } from "notistack";
import createHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
//import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux-modules/configureStore";
import { css, jsx, Global } from "@emotion/core";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import AppShell from "./AppShell";
import NewClientContainer from "./containers/NewClientContainer";
import ExistingClientContainer from "./containers/ExistingClientContainer";
import ConfigurationContainer from "./containers/ConfigurationContainer";
import LoginContainer from "./containers/LoginContainer";
import Logout from "./components/Logout"; 
import PrivateRoute from './PrivateRoute';
export const { store } = configureStore(createHistory());
const url = typeof window !== 'undefined' ? window.location.pathname : '';
  let str1 = url.split('/');
  let dom = str1[1];
  export const domainPath = dom;
const App: React.FC = () => {
  
  return (
    <React.Fragment>
      
      
      <Provider store={store}> 
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: inherit ;
          }
          html {
            box-sizing: border-box ;
          }
          html,
          body {
            padding: 0 ;
            margin: 0;
            background: url(img/repeated_bg.png) !important;
            min-height: 100%;
            font-family: "Quicksand", Helvetica, sans-serif;
          }
        `}
      />  
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Router>
          
          <Switch>
         
                <Route exact path={`/${dom}`}>
               
                  <Redirect to={`/${dom}/new-client`} /> 
                </Route>
                <Route
                  path={`/${dom}/login`}
                  component={LoginContainer}
                />
                </Switch>
                <Switch>
                
                  
                <PrivateRoute path={`/${dom}/new-client`} component={NewClientContainer} />
                <PrivateRoute
                  path={`/${dom}/existing-client`}
                  component={ExistingClientContainer}
                />
                <PrivateRoute
                  path={`/${dom}/configuration`}
                  component={ConfigurationContainer}
                />
                <PrivateRoute
                  path={`/${dom}/logout`}
                  component={Logout}
                />
                
              </Switch>
              
              
           </Router>
        </SnackbarProvider>
      </Provider>
       </React.Fragment> 
    
     
  );
};

export default App;
