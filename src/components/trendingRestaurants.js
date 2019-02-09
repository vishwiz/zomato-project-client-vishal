import React, { Component } from "react";
import SearchBar from "./searchBar";
import { debounce } from "throttle-debounce";
import "../componentCss/trendingRestaurants.css";
import Card from "./card";
import Api from "./api";

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingRestaurantsData: [],
      searchData: []

    }
  }

  componentDidMount() {
    Api.getTrendingRestaurants()
      .then(res => res.json())
      .then(trendingRestaurants => {
        // console.log(trendingRestaurants);
        this.setState({
          trendingRestaurantsData: trendingRestaurants
          // flag: !this.state.flag
        });
        console.log(this.state.trendingRestaurantsData);
      });
  }
  searchRestaurants = event => {
    event.persist();
    console.log(event.target.value !== "");

    if (event.target.value !== "") {
      console.log("okie");
      if (/^([a-zA-Z0-9]{3,})$/.test(event.target.value)) {
        debounce(1000, () => {
          Api.searchRestaurants(event.target.value)
            .then(res => res.json())
            .then(serverResponse => {
              console.log(serverResponse);
              this.setState({ searchData: serverResponse });
            });
        })();
      }
    } else this.setState({ searchData: [] });
  };

  render() {
    console.log(this.state.searchData.length);
    let displayData = this.state.searchData.length
      ? this.state.searchData
      : this.state.trendingRestaurantsData;
    console.log(displayData);

    const actualRender = (
      <div className="restaurants">
        {displayData.map(TrendingData => {
          console.log(TrendingData.location.address.city);
          return (
            <div>
              {
                <Card
                  restaurantsData ={TrendingData}
                  restaurantsImage={TrendingData.featured_image}
                  restaurantsName={TrendingData.name}
                  restaurantsLocality_Verbose={
                    TrendingData.location.locality_verbose
                  }
                />
              }
            </div>
          );
        })}
      </div>
    );
    // if (this.state.flag) {
    return (
      <div>
        <div className="carousel-fixed">
          <SearchBar onSearch={this.searchRestaurants} />
        </div>

        {this.state.trendingRestaurantsData.length > 0 ? actualRender : null}
      </div>
    );
    // } else return "Loading....";
  }
}

export default Trending;
