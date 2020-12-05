import { authAxios } from "../../axios";

export const getLastSynced = async () => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "GET",
      url: "dashboard/getLastSynced",
    });
    if (res.data.status === "success") {
      const now = new Date();
      const diffMs = now - new Date(res.data.data.lastSynced);
      return Math.round(((diffMs % 86400000) % 3600000) / 60000);
    }
  } catch (err) {
    console.log(err);
  }
};
