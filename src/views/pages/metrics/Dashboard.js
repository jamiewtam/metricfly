import React from "react";
import moment from "moment";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import { chartOptions } from "../../../api/metrics/factoryFunctions/formatChartData";
import { MetricCardWithFooter } from "../../components/MetricCard";

import { useShowCalendar } from "../../../util/hooks/useShowCalendar";
import {
  CalendarComponent,
  ShowCalendarBackdrop,
  CalenderInput,
} from "../../../components/Calendar/Calendar";
import { getDashboardData } from "../../../api/metrics";
import Loading from "../../../util/Loading/Loading";

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        ...action.data,
        loading: false,
      };
    case "SEND_REQUEST":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

const Dashboard = () => {
  const [state, dispatch] = React.useReducer(dashboardReducer, {
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
  const [bigChartData, setBigChartData] = React.useState("data1");
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
  }, [endDate]);

  const setBgChartData = (name) => {
    setBigChartData(name);
  };

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
                    <CardTitle tag="h2">Monthly Recurring Revenue</CardTitle>
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
            footer="Aggregate MRR"
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
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    {/* <h5 className="card-category">Installs</h5> */}
                    <CardTitle tag="h2">Install Metrics</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        color="info"
                        id="0"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        onClick={() => setBgChartData("data1")}
                      >
                        <input defaultChecked name="options" type="radio" />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Net Growth
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <input name="options" type="radio" />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Installs
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <input name="options" type="radio" />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Uninstalls
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={state.installDataChart[bigChartData]}
                    options={chartOptions}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
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
      </div>
    </>
  );
};

export default Dashboard;
