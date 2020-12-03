import { authAxios } from "../axios";

export const getMerchantData = async () => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "GET",
      url: "merchants/getMerchantData",
    });
    if (res.data.status === "success") {
      return res.data.data.userMerchants;
    }
  } catch (err) {
    console.log(err);
    console.log("error", err.response.data.message);
  }
};
