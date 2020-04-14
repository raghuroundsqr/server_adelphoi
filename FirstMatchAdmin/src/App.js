import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux/configureStore';
import { Switch, Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import './App.css';
import Login from './components/Login'
import EIFMSG from './components/EIFMSG'
import EIF from './components/EIF'
import QuestionsList from './components/Questionslist'
import AddQuestion from './components/AddQuestion';
import Landing from './components/landing'
import PrivateRoute from "../src/PrivateRoute";
import Configure from "./components/Configure";
import AddQuestionCategory from "./components/AddQuestionCategory";
import QuestionsCategorylist from "./components/QuestionsCategorylist";
import EIFList from "./components/EIFList";
import RAFList from "./components/RAFList";
import Header from './components/Header';
import RAF from "./components/RAF"
import RAFMSG from "./components/RAFMSG";
import Test from "./components/test"
export const { store , persistor } = configureStore(createHistory());
function App() {
  return (
    <div className="Container-fluid">
      <div className="App">
       <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
              <Router>
                <Header/>
              <Switch>
              <Route exact path="/">
                          <Redirect to="/configure" />
                        </Route>
                 <Route path="/eif" component={EIF}/>
                <Route path="/eifmsg" component={EIFMSG}/>
                <Route path="/raf/:customer" component={RAF} />
                <Route path="/rafmsg" component={RAFMSG} />
                <Route path="/login" component={Login}/>
                <Route path="/test" component={Test}/>
                 </Switch>
                <Switch>
                <PrivateRoute exact path="/configure" component={Configure}/>
                <PrivateRoute path="/configure/questions" component={QuestionsList}/>
                <PrivateRoute path="/configure/addquestion" component={AddQuestion}/>
                <PrivateRoute path="/list" component={Landing}/>
                <PrivateRoute path="/configure/questioncategory" component={AddQuestionCategory}/>
                <PrivateRoute path="/eiflist" component={EIFList}/>
                <PrivateRoute path="/raflist" component={RAFList}/>
                <PrivateRoute path="/configure/questioncategorylist" component={QuestionsCategorylist}/>
                </Switch>
               </Router>
                </PersistGate>
        </Provider>
        </div>
    </div>
  );
}

export default App;
