import React, { Component } from "react";
import Cookies from "universal-cookie";
import "../componentCss/booking.css";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userBookingData: []
    };
  }
  componentDidMount = async () => {
    const cookies = await new Cookies();
    let userEmail = await cookies.get("userEmail");

    return fetch("http://localhost:8080/api/bookings", {
      method: "GET",
      headers: {
        email: userEmail
      }
    })
      .then(res => res.json())
      .then(userBookingData => {
        console.log(userBookingData);
        this.setState({
          userBookingData
        });
      });
  };
  render() {
    console.log(this.state.userBookingData);
    if (!this.state.userBookingData.message) {
      if (this.state.userBookingData.length !== 0) {
        return (
          <section className="booking">
            <h1 className="booking-header">Yours Bookings</h1>
            <div>
              {this.state.userBookingData.map(bookingData => {
                return (
                  <div className="booking-details">
                    <div className="restaurants-image">
                      <img src={bookingData.restaurantsData.featured_image} />
                    </div>
                    <div className="booking-info">
                      <h1>Date : {bookingData.bookedDate}</h1>
                      <h1>Time : {bookingData.bookedTime}</h1>
                      <h1>Resevation for {bookingData.numberOfPeople} people</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      } else
        return (
          <section className="booking">
            <h1>No bookings are there</h1>
          </section>
        );
    } else {
      return (
        <section className="booking">
          <h1>Login First</h1>
        </section>
      );
    }
  }
}

export default Booking;
