import moment from "moment";

import { authAxios } from "../../axios";
import {
  singleLineChart,
  formatMultiLineChart,
} from "../factoryFunctions/formatChartData";

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
        monthlyExpenseTotal,
        profit,
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
        monthlyExpenseTotal,
        profit,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
