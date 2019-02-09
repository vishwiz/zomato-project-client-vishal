import React, { Component } from "react";
// import { debounce } from "throttle-debounce";
// import Api from "./api";
class SearchBar extends Component {
  //   searchRestaurants = event => {
  //     event.persist();

  //     if (event.target.value.length >= 2) {
  //       debounce(1000, async () => {
  //         Api.searchRestaurants(event.target.value)
  //           .then(res => res.json())
  //           .then(serverResponse => {
  //             console.log(serverResponse);
  //             this.props.onSearch(serverResponse);
  //           });
  //       })();
  //     }
  //   };
  render() {
    return (
      <input
        type="text"
        onKeyUp={this.props.onSearch}
        placeholder="Search for restaurants...."
      />
    );
  }
}

export default SearchBar;
