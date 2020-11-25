import Swal from "sweetalert2";
import { authAxios } from "../axios";

export const updateUser = async (email, timezone) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "PATCH",
      url: "users/updateUser",
      data: {
        email,
        timezone,
      },
    });
    if (res.data.status === "success") {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "User Data Has Been Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addAppID = async (appID, trialPeriod) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "POST",
      url: "users/addAppIDAndTrialPeriod",
      data: {
        appID,
        trialPeriod,
      },
    });
    if (res.data.status === "success") {
      return { status: "success" };
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeAppID = async (appID) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "DELETE",
      url: "users/removeAppIDAndTrialPeriod",
      data: {
        appID,
      },
    });
    if (res.data.status === "success") {
      return { status: "success" };
    }
  } catch (err) {
    console.log(err);
  }
};
