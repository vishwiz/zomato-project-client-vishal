import React, { Component } from "react";
import Trending from "../components/trendingRestaurants";
import Carousel from "../components/carousel";
import "../componentCss/App.css";

class Home extends Component {
  render() {
    return (
      <section className="trending-restaurants">
        <Carousel />
        <div className="trending-restaurants-cards">
         <div className="trending"> <h1 className="trending-h1">Trending</h1>
          <Trending />
          </div> 
          <div/>
        </div>
      </section>
    );
  }
}

export default Home;
