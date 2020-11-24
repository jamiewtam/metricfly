import moment from "moment";

import { authAxios } from "../../axios";
import { singleLineChart, formatMultiLineChart } from "./formatChartData";

export const getDashboardData = async (
  startDateUnformatted,
  endDateUnformatted
) => {
  try {
    const axios = authAxios();
    const startDate = moment(startDateUnformatted).format("YYYY-MM-DD");
    const endDate = moment(endDateUnformatted).format("YYYY-MM-DD");
    const res = await axios({
      method: "POST",
      url: "dashboard/getDashboardData",
      data: {
        startDate,
        endDate,
      },
    });
    if (res.data.status === "success") {
      const {
        merchants,
        trialMerchants,
        paidMerchants,
        MRR,
        LTV,
        earnings,
        MRRArr,
        netMerchants,
        installs,
        uninstalls,
        closedStores,
        uninstallReasonArr,
        eventArr,
        installChartArr,
        uninstallChartArr,
        netInstallChartArr,
      } = res.data.data;

      const MRRChart = singleLineChart(MRRArr);
      const installDataChart = formatMultiLineChart(
        netInstallChartArr,
        installChartArr,
        uninstallChartArr
      );

      return {
        merchants,
        trialMerchants,
        paidMerchants,
        MRR,
        LTV,
        earnings,
        MRRChart,
        netMerchants,
        installs,
        uninstalls,
        closedStores,
        uninstallReasonArr,
        eventArr,
        installDataChart,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
