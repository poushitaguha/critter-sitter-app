import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles.css';
import Mynavbar from './Mynavbar.js'
import Home from './components/Home.js'
import Search from './components/Search.js'
import Profile from './components/Profile.js'
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import Contact from './components/Contact.js'
import Messages from './components/Messages.js'
import Error from './components/Error.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentLoggedInUser: null
    };
  }

  handleLogout = e => {
    e.preventDefault();
    localStorage.clear();

    this.setState({
      currentLoggedInUser: null
    });
    window.location.href = "http://localhost:3000/";
  };

  handleLogin = e => {
    e.preventDefault();
    localStorage.setItem('loggedInUsersEmail', e.target.elements[0].value);
    localStorage.setItem('loggedInUsersId', e.target.elements[1].value);
    this.setState({
      currentLoggedInUser: {
        email: e.target.elements[0].value,
        id: e.target.elements[1].value
      }
    });
  };

  render() {
    return (
      <Router>
        <Mynavbar
          handleLogout={this.handleLogout}
          currentUser={this.state.currentLoggedInUser}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:role" component={Search} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route path="/profile/:id/contact/:name" component={Contact} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/login"
            render={(routeProps) => (
              <Login
                handleLogin={this.handleLogin}
                currentUser={this.state.currentLoggedInUser}
              />
            )}
          />
          <Route
            path="/messages"
            render={(routeProps) => (
              <Messages
                currentUser={this.state.currentLoggedInUser}
              />
            )}
          />
          <Route component={Error} />
        </Switch>
      </Router>
    );
  }
}

export default App;
