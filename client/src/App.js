import React, {Fragment} from 'react'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import ContactState from './context/contacts/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token)
}
const App=()=>{
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
      <Fragment>
        <Navbar />
        <div class="container">
        <Alerts />
          <Routes>
            <PrivateRoute exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
          </Routes>
        </div>
      </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>

  );
}

export default App;
