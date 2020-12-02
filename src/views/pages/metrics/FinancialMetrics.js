import React from "react";
import moment from "moment";
import { Row, Col } from "reactstrap";
//COMPONENTS
import Loading from "../../../util/Loading/Loading";
import {
  MultiTabLineChart,
  metricReducer,
  EventsTable,
} from "./components/metricComponents";
import LastSynced from "./components/lastSynced";
import { MetricCardWithFooter } from "../../components/MetricCard";
import {
  CalendarComponent,
  ShowCalendarBackdrop,
  CalenderInput,
} from "../../../components/Calendar/Calendar";
//FUNCTIONS
import { useShowCalendar } from "../../../util/hooks/useShowCalendar";
import { getFinancialMetrics } from "../../../api/metrics";

const FinancialMetrics = () => {
  const [state, dispatch] = React.useReducer(metricReducer, {
    LTV: 0,
    MRR: 0,
    earnings: 0,
    appCreditTotal: 0,
    ARPU: 0,
    profit: 0,
    monthlyExpenseTotal: 0,
    revenueChart: [],
    financialEventsArr: [],
    loading: true,
  });

  const [startDate, setStartDate] = React.useState({
    startDate: new Date(moment().subtract(7, "days")),
    dateCounter: 0,
  });
  const [endDate, setEndDate] = React.useState({
    endDate: new Date(),
  });

  const [showCalendar, handleCalendar] = useShowCalendar();

  React.useEffect(() => {
    dispatch({ type: "SEND_REQUEST" });

    const startDateStartOfDay = moment(startDate.startDate)
      .startOf("day")
      .format("YYYY-MM-DD");

    const endDateEndOfDay = moment(endDate.endDate)
      .endOf("day")
      .format("YYYY-MM-DD");

    getFinancialMetrics(startDateStartOfDay, endDateEndOfDay).then((data) => {
      dispatch({
        type: "UPDATE",
        data: data,
      });
    });

    return () => {
      handleCalendar();
    };
  }, [endDate]);

  const financialEventSection = state.financialEventsArr.map((event) => {
    return (
      <tr key={Math.random()}>
        <td className="text-center">{event.date}</td>
        <td>{event.appName}</td>
        <td>{event.store}</td>
        <td>{event.description}</td>
        <td className="text-center">{event.amount}</td>
      </tr>
    );
  });

  if (state.loading) {
    return <Loading />;
  }

  return (
    <>
      <ShowCalendarBackdrop
        handleCalendar={handleCalendar}
        showCalendar={showCalendar}
      />
      <div className="content">
        <Row>
          <Col sm="8"></Col>
          <Col className="text-right pl-3" sm="4">
            <CalendarComponent
              showCalendar={showCalendar}
              startDateItems={{
                startDate,
                setStartDate,
              }}
              endDateItems={{
                endDate,
                setEndDate,
              }}
            />
            <CalenderInput
              startDate={startDate.startDate}
              endDate={endDate.endDate}
              handleCalendar={handleCalendar}
            />
          </Col>
        </Row>

        <MultiTabLineChart
          chartData={state.revenueChart}
          title="Revenue Metrics"
          subTitleOne="Monthly Recurring Revenue (Net Fees)"
          subTitleTwo="Earnings"
        />

        <Row>
          <MetricCardWithFooter
            color="warning"
            title="Revenue"
            amount={state.earnings.toFixed(2)}
            icon="sound-wave"
            footer="Total Revenue From Payouts"
          />
          <MetricCardWithFooter
            color="danger"
            title="Ad Spend"
            amount="Beta"
            icon="single-02"
            footer="Total Revenue From Payouts"
          />
          <MetricCardWithFooter
            color="danger"
            title="Monthly Expenses"
            amount={state.monthlyExpenseTotal.toFixed(2)}
            icon="calendar-60"
            footer="Proportionally Calculated By Dates"
          />
          <MetricCardWithFooter
            color="danger"
            title="Credits Issued"
            amount={state.appCreditTotal.toFixed(2)}
            icon="simple-delete"
            footer="Application
              Credit Issued"
          />
          <MetricCardWithFooter
            color="primary"
            title="Profit"
            amount={state.profit.toFixed(2)}
            icon="money-coins"
            footer="Payout Revenue Minus Exp."
          />
          <MetricCardWithFooter
            color="warning"
            title="CAC"
            amount="Beta"
            icon="badge"
            footer="Cost per acquisition"
          />
          <MetricCardWithFooter
            color="warning"
            title="ARPU"
            amount={state.ARPU}
            icon="refresh-01"
            footer="Average Revenue Per User"
          />
          <MetricCardWithFooter
            color="warning"
            title="Ads/Installs"
            amount="Beta"
            icon="paper"
            footer="Ad Cost Per Install"
          />
        </Row>
        <Row>
          <EventsTable
            headers={["date", "App Name", "Store", "Description", "Amount"]}
            title="Financial Events"
            tableBody={financialEventSection}
          />
        </Row>
        <LastSynced />
      </div>
    </>
  );
};

export default FinancialMetrics;
