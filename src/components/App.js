import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/home";
import Booking from "../components/booking";
import Profile from "../components/profile";
import Menu from "../components/menu";
import UserLogin from  '../components/userLogin';
import "../componentCss/App.css";

class App extends Component {
  render() {
    return (
      <section className="main">
        <div className="section">
          <BrowserRouter>
            <div>
              <header>
                <div className="header">
                 <div className="menu-button"> <Menu /></div>
                  <h1>DeSi FooD aDDa</h1>
                  <UserLogin />
                </div>
              </header>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/booking" component={Booking} />
                <Route path="/profile" component={Profile} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </section>
    );
  }
}

export default App;
