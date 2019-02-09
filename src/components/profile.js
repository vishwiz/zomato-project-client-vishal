import React, { Component } from "react";
import Cookies from "universal-cookie";
import ProfileEdit from "../components/ProfileEdit";
import "../componentCss/profile.css";
class Profile extends Component {
  state = {
    userProfileData: {},
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount = () => {
    this.getUserDetails();
  };
  getUserDetails = () => {
    const cookies = new Cookies();
    let userEmail = cookies.get("userEmail");
    console.log("it is mounted");
    return fetch(`http://localhost:8080/api/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        email: userEmail
      }
    })
      .then(res => res.json())
      .then(userProfileData => {
        console.log(userProfileData);
        this.setState({
          userProfileData
        });
      });
  };
  onSaveUpdateProfile = async (name, contact, payment) => {
    const cookies = await new Cookies();
    let userEmail = await cookies.get("userEmail");
    let updateData = {
      email: userEmail,
      name: name,
      phone: contact,
      payment: payment
    };
    return fetch(`http://localhost:8080/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    })
      .then(res => res.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({
          nameValue: "",
          contactValue: "",
          payment: ""
        });
      });
  };
  render() {
    console.log(this.state.userProfileData.name);
    if (!this.state.userProfileData.message) {
      return (
        <section className="profile">
          <div>
            <h1 className="profile-header">Profile</h1>

            <div className="profile-data profile-background">
              <div className="profile-picture">
                <img
                  src={this.state.userProfileData.photoUrl}
                  alt="user-profile-photo"
                />
              </div>
              <div className="profile-details">
                <form>
                  <div className="label-data">
                    <label>Name :</label>
                    <h1>{this.state.userProfileData.name}</h1>
                  </div>
                  <div className="label-data">
                    <label>Email :</label>
                    <h1>{this.state.userProfileData.email}</h1>
                  </div>
                  <div className="label-data">
                    <label>Phone :</label>
                    <h1>{this.state.userProfileData.phone}</h1>
                  </div>
                  <div className="label-data">
                    <label>Payment :</label>
                    <h1>{this.state.userProfileData.payment}</h1>
                  </div>
                </form>
                <div>
                  <ProfileEdit
                    onSaveUpdateProfile={this.onSaveUpdateProfile}
                    getUserDetails={this.getUserDetails}
                    handleClickOpen={this.handleClickOpen}
                    handleClose={this.handleClose}
                    open={this.state.open}
                  />
                </div>
              </div>
            </div>
            <div />
          </div>
        </section>
      );
    } else
      return (
        <section className="profile">
          <div className="profile-background">
            <h1 className="profile-header">Login First</h1>
          </div>
        </section>
      );
  }
}

export default Profile;
