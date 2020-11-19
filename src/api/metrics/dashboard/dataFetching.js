import { authAxios } from "../../axios";
import moment from "moment";

export const getDashboardData = async (
  startDateUnformatted,
  endDateUnformatted
) => {
  try {
    const axios = authAxios();
    const startDate = moment(startDateUnformatted).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
    const endDate = moment(endDateUnformatted).format("YYYY-MM-DDTHH:mm:ss");
    const res = await axios({
      method: "POST",
      url: "dashboard/getDashboardData",
      data: {
        startDate,
        endDate,
      },
    });
    if (res.data.status === "success") {
      console.log(res.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};
