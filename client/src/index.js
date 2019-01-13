import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import { logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';
import LandingPage from 'views/LandingPage/LandingPage.jsx';
import ProfilePage from 'views/ProfilePage/ProfilePage.jsx';
import CreateProfile from 'views/ProfilePage/CreateProfile.jsx';
import EditProfile from 'views/ProfilePage/EditProfile.jsx';
import AddExperience from 'views/ProfilePage/AddExperience.jsx';
import AddAdventure from 'views/ProfilePage/AddAdventure.jsx';
import EditAdventure from 'views/ProfilePage/EditAdventure.jsx';
import Adventures from 'views/AdventurePage/Adventures.jsx';
import Adventure from 'views/AdventurePage/Adventure.jsx';
import Message from 'views/ProfilePage/Message.jsx';
import MessagePage from 'views/ProfilePage/MessagePage.jsx';


import Register from 'views/auth/Register.jsx';
import ForgotPassword from 'views/auth/ForgotPassword.jsx';
import ResetPassword from 'views/auth/ResetPassword.jsx';
import EmailSent from 'views/auth/EmailSent.jsx';

import PrivateRoute from './components/common/PrivateRoute';

import "assets/scss/material-kit-pro-react.css?v=1.2.0";

import { set } from 'mongoose';

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and is Authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to Homepage
    window.location.href = '/';
  }
}


ReactDOM.render(
  <Provider store={ store }>
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset-password" component={ ResetPassword } />
          <Route exact path="/forgot-password" component={ ForgotPassword } />          
          <Route exact path="/email-sent" component={ EmailSent } />     
          <Switch>
              <PrivateRoute exact path="/profile" component={ProfilePage} />
          </Switch>
          <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          </Switch>
          <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
        </Switch>
        <Switch>
            <PrivateRoute exact path="/add-adventure" component={AddAdventure} />
        </Switch>
        <Switch>
            <PrivateRoute exact path="/edit-adventure/:id" component={EditAdventure} />
        </Switch>
        <Switch>
            <PrivateRoute exact path="/message/:id" component={Message} />
        </Switch>
        <Switch>
            <PrivateRoute exact path="/messages" component={MessagePage} />
        </Switch>
        <Route exact path="/adventures" component={ Adventures } />
        <Route exact path="/adventure/:id" component={ Adventure } />
        </div>
      </Router>
  </Provider>,
  document.getElementById("root")
);


