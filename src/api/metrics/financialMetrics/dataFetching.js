import { authAxios } from "../../axios";
import { formatTwoSectionLineChart } from "../factoryFunctions/formatChartData";

export const getFinancialMetrics = async (startDate, endDate) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "POST",
      url: "dashboard/getFinancialMetrics",
      data: {
        startDate,
        endDate,
      },
    });
    if (res.data.status === "success") {
      const {
        LTV,
        MRR,
        earnings,
        earningsChartArr,
        ARPU,
        appCreditTotal,
        financialEventsArr,
        MRRArr,
        monthlyExpenseTotal,
        profit,
      } = res.data.data;

      const revenueChart = formatTwoSectionLineChart(
        MRRArr,
        "Recurring Revenue",
        earningsChartArr,
        "Earnings"
      );

      return {
        LTV,
        MRR,
        earnings,
        ARPU,
        appCreditTotal,
        monthlyExpenseTotal,
        financialEventsArr,
        profit,
        revenueChart,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
