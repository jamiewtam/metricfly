import { authAxios } from "../axios";

export const registerUser = async (email, password, passwordConfirm) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "POST",
      url: "users/signup",
      data: {
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === "success") {
      return {
        status: "success",
        token: res.data.token,
        user: res.data.data.user,
      };
    }
  } catch (err) {
    const errorMessage = err.response.data.message;

    if (
      errorMessage ===
      "User validation failed: password: Path `password` (`test`) is shorter than the minimum allowed length (8)."
    ) {
      return {
        status: "error",
        message: "Password is less than 8 characters",
      };
    } else if (errorMessage.includes("E11000 duplicate key error")) {
      return {
        status: "error",
        message: "That Email is already associated with a user",
      };
    } else if (errorMessage.includes("User validation failed")) {
      return {
        status: "error",
        message: "Your password do not match",
      };
    } else {
      return {
        status: "error",
        message: "There was an error please try again",
      };
    }
  }
};

export const loginUser = async (email, password) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "POST",
      url: "users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      console.log("response");
      return {
        status: "success",
        token: res.data.token,
        user: res.data.data.user,
      };
    }
  } catch (err) {
    console.log(err);
    const errorMessage = err.response.data.message;

    return {
      status: "error",
      message: errorMessage,
    };
  }
};
export const logoutUser = async () => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "GET",
      url: "users/logout",
    });
    if (res.data.status === "success") {
      return { status: "success" };
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};
