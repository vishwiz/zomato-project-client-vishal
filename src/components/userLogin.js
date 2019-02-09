import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import '../componentCss/userLogin.css'

firebase.initializeApp({
  apiKey: "AIzaSyDRDpU-DEIX3a_OcsIJRUnvYEYbOEYSJvs",
  authDomain: "fir-auth-4510d.firebaseapp.com"
});

class Login extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  };
  signOut = async () => {
    const cookies = await new Cookies();
    return cookies.remove("userEmail", { path: "/" });
  };
  componentDidMount = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      let newUser = {
        name: user.displayName,
        email: user.email,
        password: "",
        booking: [],
        address: "",
        phone: "123456789",
        payment: "paytm",
        photoUrl: user.photoURL
      };
      return fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const cookies = new Cookies();
          cookies.set("userEmail", user.email, { path: "/" });
        });
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            
            <div className="sign-in-header" onClick={this.signOut}>
            <h4 >{firebase.auth().currentUser.displayName}</h4>
              <button className="sign-out-header" onClick={() => firebase.auth().signOut()}>
                <NavLink to="/">Sign out!</NavLink>
              </button>
            </div>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}
export default Login;
