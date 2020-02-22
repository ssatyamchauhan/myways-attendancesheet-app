import React from 'react';
import './App.css';
import Signup from './Components/users/signup';
import Login from './Components/users/login';
import Home from './Components/pages/home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Route exact path='/' exact component={Home}  />
      <Route path='/login' component={Login} />
      <Route path='/home' component={Home} />
      <Route path='/signup' component={Signup} />

    </Router>
  );
}

export default App;
