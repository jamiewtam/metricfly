import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
//COMPONENTS
import { MetricCardWithFooter } from "../../components/MetricCard";
import Loading from "../../../util/Loading/Loading";
import {
  CalendarComponent,
  ShowCalendarBackdrop,
  CalenderInput,
} from "../../../components/Calendar/Calendar";
import {
  MultiTabLineChart,
  metricReducer,
} from "./components/metricComponents";
import LastSynced from "./components/lastSynced";
//FUNCTIONS AND HOOKS
import { getDashboardData } from "../../../api/metrics";
import { useShowCalendar } from "../../../util/hooks/useShowCalendar";
import { chartOptions } from "../../../api/metrics/factoryFunctions/formatChartData";

const Dashboard = () => {
  const [state, dispatch] = React.useReducer(metricReducer, {
    merchants: 0,
    trialMerchants: 0,
    paidMerchants: 0,
    MRR: 0,
    LTV: 0,
    earnings: 0,
    MRRChart: [],
    netMerchants: 0,
    installs: 0,
    uninstalls: 0,
    closedStores: 0,
    uninstallReasonArr: [],
    eventArr: [],
    installDataChart: {},
    chartOptions: {},
    monthlyExpenseTotal: 0,
    profit: 0,
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

    const startDateStartOfDay = moment(startDate.startDate).startOf("day");

    const endDateEndOfDay = moment(endDate.endDate).endOf("day");

    getDashboardData(startDateStartOfDay, endDateEndOfDay).then((data) => {
      dispatch({
        type: "UPDATE",
        data: data,
      });
    });

    return () => {
      handleCalendar();
    };
    // eslint-disable-next-line
  }, [endDate]);

  const appEventSection = state.eventArr.map((event) => {
    return (
      <tr key={Math.random()}>
        <td className="text-center">{event.date}</td>
        <td>{event.store}</td>
        <td>{event.event}</td>
        <td>{event.description}</td>
      </tr>
    );
  });

  const uninstallSection = state.uninstallReasonArr.map((event) => {
    if (event.reason) {
      return (
        <tr key={Math.random()}>
          <td className="text-center">{event.date}</td>
          <td>{event.store}</td>
          <td>{event.reason}</td>
        </tr>
      );
    }

    return null;
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
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">
                      Monthly Recurring Revenue (Net Fees)
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={state.MRRChart} options={chartOptions} />
                </div>
              </CardBody>
            </Card>
          </Col>

          <MetricCardWithFooter
            color="success"
            title="Merchants"
            amount={state.merchants}
            icon="chat-33"
            footer="Trial/Paid Merchants"
          />
          <MetricCardWithFooter
            color="primary"
            title="Recurring Revenue"
            amount={state.MRR.toFixed(2)}
            icon="sound-wave"
            footer="MRR Net Shopify Fees"
          />
          <MetricCardWithFooter
            color="success"
            title="Earnings"
            amount={state.earnings.toFixed(2)}
            icon="coins"
            footer="Amount Added to Shopify Payouts"
          />
          <MetricCardWithFooter
            color="warning"
            title="Customer LTV"
            icon="spaceship"
            amount={state.LTV.toFixed(2)}
            footer="Customer Lifetime Value"
          />
          <MetricCardWithFooter
            color="warning"
            title="Paying Merchants"
            icon="bag-16"
            amount={state.paidMerchants}
            footer="Past Trial Period"
          />
          <MetricCardWithFooter
            color="success"
            title="Trial Merchants"
            icon="cart"
            amount={state.trialMerchants}
            footer="Within Trial Period"
          />
          <MetricCardWithFooter
            color="danger"
            title="Expenses"
            icon="simple-delete"
            amount={state.monthlyExpenseTotal.toFixed(2)}
            footer="Monthly Expenses"
          />
          <MetricCardWithFooter
            color="danger"
            title="Profit"
            icon="money-coins"
            amount={state.profit.toFixed(2)}
            footer="Earnings Minus Expenses"
          />
        </Row>
        <MultiTabLineChart
          chartData={state.installDataChart}
          title="Install Metrics"
          subTitleOne="Net Growth"
          subTitleTwo="Installs"
          subTitleThree="Uninstalls"
          iconOne="simple-add"
          iconTwo="simple-remove"
          iconThree="single-02"
        />
        <Row>
          <MetricCardWithFooter
            color="success"
            title="Installs"
            amount={state.installs}
            icon="simple-add"
            footer="Recurring Charge Accepted"
          />
          <MetricCardWithFooter
            color="warning"
            title="Uninstalls"
            amount={state.uninstalls}
            icon="simple-delete"
            footer="Uninstalled App"
          />
          <MetricCardWithFooter
            color="danger"
            title="Closed Stores"
            amount={state.closedStores}
            icon="simple-remove"
            footer="Number of Closed Shopify Stores"
          />
          <MetricCardWithFooter
            color="warning"
            title="Net Change"
            amount={state.netMerchants}
            icon="refresh-02"
            footer="Installs Minus Uninstalls"
          />
        </Row>
        <Row>
          <Col lg="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">App Events</CardTitle>
              </CardHeader>
              <CardBody
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">Date</th>
                      <th>Store</th>
                      <th>Event</th>
                      <th>Event Details</th>
                    </tr>
                  </thead>
                  <tbody>{appEventSection}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Uninstalls Reasons</CardTitle>
              </CardHeader>
              <CardBody
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">Date</th>
                      <th>Store</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>{uninstallSection}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <LastSynced />
      </div>
    </>
  );
};

export default Dashboard;
