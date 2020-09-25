import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './const/routes';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Notfound from './component/Notfound';
import './App.css';
import Navigation from './component/Navigation';

function App() {
  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.REGISTER} component={Register} />
        <Route component={Notfound} />
      </Switch>
    </Router>
  );
}

export default App;
