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
        reactivations,
        LTV,
        eventArr,
        installChartArr,
        uninstallChartArr,
        netInstallChartArr,
        userChurn,
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
        reactivations,
        LTV,
        eventArr,
        installDataChart,
        userChurn,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
