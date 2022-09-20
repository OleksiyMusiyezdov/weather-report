import axios from "axios";

export const api = () => {
  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions",
    headers: {
      "X-RapidAPI-Key": "ab388ae51bmsh90d882beb26456bp14a803jsnd626cd236914",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
