import axios from "axios";

const loadUserInContext = (loginHandlerFromContext, loadingHandler) => {
  const userDataFromLocalStorage = JSON.parse(localStorage.getItem("userData"));

  const getCurrentUser = async (token) => {
    try {
      // const url = "http://127.0.0.1:9000/api/v1/users/findDBUser";
      const url = "https://metricflyapi.herokuapp.com/api/v1/users/findDBUser";
      const res = await axios({
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === "success") {
        return res.data.data.user;
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (
    userDataFromLocalStorage &&
    userDataFromLocalStorage.token &&
    new Date(userDataFromLocalStorage.expiration) > new Date()
  ) {
    getCurrentUser(userDataFromLocalStorage.token).then((user) => {
      loginHandlerFromContext(
        userDataFromLocalStorage.token,
        user,
        new Date(userDataFromLocalStorage.expiration)
      );
      loadingHandler();
    });
  } else {
    loadingHandler();
  }
};

export default loadUserInContext;
