import axios from "axios";

// Testing URL
// const url = "http://localhost:9000/api/v1/";
// Heroku URL
const url = "https://metricflyapi.herokuapp.com//api/v1/";

export const authAxios = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    return axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
  } else {
    return axios.create({
      baseURL: url,
    });
  }
};
