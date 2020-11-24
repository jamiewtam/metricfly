import React from "react";
import moment from "moment";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import { chartExample1 } from "variables/charts.js";

import { chartOptions } from "../api/metrics/dashboard/formatChartData";

import { useShowCalendar } from "../util/hooks/useShowCalendar";
import {
  CalendarComponent,
  ShowCalendarBackdrop,
  CalenderInput,
} from "../components/Calendar/Calendar";
import { getDashboardData } from "../api/metrics";

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

    const startDateTest = moment(startDate.startDate).startOf("day");

    const endDateTest = moment(endDate.endDate).endOf("day");

    getDashboardData(startDateTest, endDateTest).then((data) => {
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
    return (
      <tr key={Math.random()}>
        <td className="text-center">{event.date}</td>
        <td>{event.store}</td>
        <td>{event.reason}</td>
      </tr>
    );
  });

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
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-success">
                      <i className="tim-icons icon-chat-33" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Merchants</p>
                      <CardTitle tag="h3">{state.merchants}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Trial/Paid Merchants</div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-primary">
                      <i className="tim-icons icon-sound-wave" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Recurring Revenue</p>
                      <CardTitle tag="h3">{state.MRR}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Display Date</div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-success">
                      <i className="tim-icons icon-coins" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Earnings</p>
                      <CardTitle tag="h3">
                        {state.earnings.toFixed(2)}
                      </CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Added to Shopify Payout</div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-warning">
                      <i className="tim-icons icon-spaceship" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Customer LTV</p>
                      <CardTitle tag="h3">{state.LTV}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Customer LifeTime Value</div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-warning">
                      <i className="tim-icons icon-bag-16" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Paying Merchants</p>
                      <CardTitle tag="h3">{state.paidMerchants}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Past Trial Period</div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-success">
                      <i className="tim-icons icon-cart" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Trial Merchants</p>
                      <CardTitle tag="h3">{state.trialMerchants}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">In Trial Period</div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-danger">
                      <i className="tim-icons icon-simple-delete" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Expenses</p>
                      <CardTitle tag="h3">{state.paidMerchants}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Monthly & Ad Exp.</div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-primary">
                      <i className="tim-icons icon-money-coins" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Profit</p>
                      <CardTitle tag="h3">356.57</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Earnings Minus Expenses</div>
              </CardFooter>
            </Card>
          </Col>
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
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-success">
                      <i className="tim-icons icon-simple-add" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Installs</p>
                      <CardTitle tag="h3">{state.installs}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Recurring Charge Accepted</div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-warning">
                      <i className="tim-icons icon-simple-delete" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Uninstalls</p>
                      <CardTitle tag="h3">{state.uninstalls}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Uninstalled App</div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-danger">
                      <i className="tim-icons icon-simple-remove" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Closed Stores</p>
                      <CardTitle tag="h3">{state.closedStores}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Number of Closed Shopify Stores</div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col xs="5">
                    <div className="info-icon text-center icon-primary">
                      <i className="tim-icons icon-single-02" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Net Merchants</p>
                      <CardTitle tag="h3">{state.netMerchants}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">Installs Minus Uninstalls</div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">App Events</CardTitle>
              </CardHeader>
              <CardBody
                style={{
                  maxHeight: "500px",
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
                <CardTitle tag="h5">Uninstalls</CardTitle>
              </CardHeader>
              <CardBody
                style={{
                  maxHeight: "500px",
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
