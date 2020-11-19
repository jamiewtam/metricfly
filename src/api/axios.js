import axios from "axios";

export const authAxios = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    return axios.create({
      baseURL: "http://localhost:9000/api/v1/",
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
  } else {
    return axios.create({
      baseURL: "http://localhost:9000/api/v1/",
    });
  }
};
