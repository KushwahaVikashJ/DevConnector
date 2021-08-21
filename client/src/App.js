import React,{Fragment,useEffect,useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider} from 'react-redux'
import store from './redux/store'

import Alert from './components/layout/Alert'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard'
import CreateProfile from './components/profileForms/CreateProfile'
import EditProfile from './components/profileForms/EditProfile'
import AddEducation from './components/profileForms/AddEducation'
import AddExperience from './components/profileForms/AddExperience'
import Profiles from './components/profiles'
import Profile from './components/profile'
import Posts from './components/posts'
import Post from './components/post'
import PrivateRoute from './components/routing/PrivateRoute'
import { loadUser } from './redux/actions'
import setAuthToken from './utils/SetAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  },[])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Route exact path="/" component={Landing}/>
          <section className="container">
            <Alert/>
            <Switch>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profiles" component={Profiles}/>
              <Route exact path="/profile/:id" component={Profile}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              <PrivateRoute exact path="/add-education" component={AddEducation}/>
              <PrivateRoute exact path="/add-experience" component={AddExperience}/>
              <PrivateRoute exact path="/posts" component={Posts}/>
              <PrivateRoute exact path="/posts/:id" component={Post}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
