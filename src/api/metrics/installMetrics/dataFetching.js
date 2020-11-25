import moment from "moment";
import { createLanguageService } from "typescript";

import { authAxios } from "../../axios";
import { formatMultiLineChart } from "../factoryFunctions/formatChartData";

export const getInstalMetrics = async (startDate, endDate) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "POST",
      url: "dashboard/getInstallMetrics",
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
        netMerchants,
        installs,
        uninstalls,
        closedStores,
        eventArr,
        installChartArr,
        uninstallChartArr,
        netInstallChartArr,
      } = res.data.data;

      const installDataChart = formatMultiLineChart(
        netInstallChartArr,
        installChartArr,
        uninstallChartArr
      );

      return {
        merchants,
        trialMerchants,
        paidMerchants,
        netMerchants,
        installs,
        uninstalls,
        closedStores,
        eventArr,
        installDataChart,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
