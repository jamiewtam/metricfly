import axios from "axios";

export const addAppID = async (appID, trialPeriod) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:9000/api/v1/users/addAppIDAndTrialPeriod",
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
    const res = await axios({
      method: "DELETE",
      url: "http://localhost:9000/api/v1/users/removeAppIDAndTrialPeriod",
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
