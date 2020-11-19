import { authAxios } from "../axios";

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
