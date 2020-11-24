export const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};

const insertLineChartData = (dateArr, valueArr, label) => {
  return (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: dateArr,
      datasets: [
        {
          label,
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: valueArr,
        },
      ],
    };
  };
};

const formatLineChart = (chartData) => {
  const dateArr = [];
  const valueArr = [];
  chartData.forEach((el) => {
    dateArr.push(el.date);
    valueArr.push(el.amount);
  });

  return [dateArr, valueArr];
};

const multiLineChartData = (
  netInstallDates,
  netInstallValues,
  installDates,
  installValues,
  uninstallDates,
  uninstallValues
) => {
  return {
    data1: insertLineChartData(
      netInstallDates,
      netInstallValues,
      "Net Installs"
    ),
    data2: insertLineChartData(installDates, installValues, "Installs"),
    data3: insertLineChartData(uninstallDates, uninstallValues, "Uninstalls"),
  };
};

export const formatMultiLineChart = (
  netInstallData,
  installData,
  uninstallData
) => {
  const [netInstallDates, netInstallValues] = formatLineChart(netInstallData);
  const [installDates, installValues] = formatLineChart(installData);
  const [uninstallDates, uninstallValues] = formatLineChart(uninstallData);

  return multiLineChartData(
    netInstallDates,
    netInstallValues,
    installDates,
    installValues,
    uninstallDates,
    uninstallValues
  );
};

export const singleLineChart = (chartData) => {
  const [dateArr, valueArr] = formatLineChart(chartData);
  return insertLineChartData(dateArr, valueArr, "MRR");
};
