const getTrendingRestaurants = () => {
  return fetch("http://localhost:8080/api/restaurants/trending", {
    method: "GET"
  });
};

const searchRestaurants = search => {
  return fetch(`http://localhost:8080/api/restaurants/search/${search}`, {
    method: "GET"
  });
};

export default { getTrendingRestaurants, searchRestaurants };
