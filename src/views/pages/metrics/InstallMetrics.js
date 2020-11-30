import React from "react";
import moment from "moment";
import classNames from "classnames";
import { Line } from "react-chartjs-2";
import { VectorMap } from "react-jvectormap";

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

import { MetricCardWithFooter, MetricCard } from "../../components/MetricCard";

import { chartOptions } from "../../../api/metrics/factoryFunctions/formatChartData";

import { useShowCalendar } from "../../../util/hooks/useShowCalendar";
import Loading from "../../../util/Loading/Loading";

import {
  CalendarComponent,
  ShowCalendarBackdrop,
  CalenderInput,
} from "../../../components/Calendar/Calendar";
import { getInstalMetrics } from "../../../api/metrics";

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

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

const InstallMetrics = () => {
  const [state, dispatch] = React.useReducer(dashboardReducer, {
    merchants: 0,
    trialMerchants: 0,
    paidMerchants: 0,
    netMerchants: 0,
    installs: 0,
    uninstalls: 0,
    closedStores: 0,
    eventArr: [],
    installDataChart: [],
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

    const startDateStartOfDay = moment(startDate.startDate)
      .startOf("day")
      .format("YYYY-MM-DD");
    console.log("startDateStartOfDay:", startDateStartOfDay);

    const endDateEndOfDay = moment(endDate.endDate)
      .endOf("day")
      .format("YYYY-MM-DD");
    console.log("endDateEndOfDay:", endDateEndOfDay);

    getInstalMetrics(startDateStartOfDay, endDateEndOfDay).then((data) => {
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
                    <CardTitle tag="h2">Merchant Metrics</CardTitle>
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
                          Net Merchants
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
          <MetricCard
            color="primary"
            title="Merchant Count"
            amount={state.merchants}
            icon="shape-star"
          />
          <MetricCard
            color="success"
            title="Installs"
            amount={state.installs}
            icon="simple-add"
          />
          <MetricCard
            color="danger"
            title="Uninstalls"
            amount={state.uninstalls}
            icon="simple-delete"
          />
          <MetricCard
            color="warning"
            title="Net Change"
            amount={state.netMerchants}
            icon="refresh-02"
          />
          <MetricCardWithFooter
            color="success"
            title="Lifetime"
            amount="finish"
            icon="molecule-40"
            footer="Avg. Merchant Install Length"
          />
          <MetricCardWithFooter
            color="warning"
            title="Reactivations"
            amount="finish"
            icon="triangle-right-17"
            footer="Merchants Who Installed Again"
          />
          <MetricCardWithFooter
            color="success"
            title="Up/down"
            amount="finish"
            icon="components"
            footer="Net Plan Upgrades/Downgrades"
          />
          <MetricCardWithFooter
            color="success"
            title="User Churn (%)"
            amount="finish"
            icon="refresh-01"
            footer="Uninstalls / Installs"
          />
        </Row>
        <Row>
          <Col lg="12">
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
                      <th>Description</th>
                      <th className="text-center">Amount</th>
                    </tr>
                  </thead>
                  <tbody>{appEventSection}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* <Col lg="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Global Sales by Top Locations</CardTitle>
                <p className="card-category">All products that were shipped</p>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="6">
                    <Table responsive>
                      <tbody>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/US.png")}
                              />
                            </div>
                          </td>
                          <td>USA</td>
                          <td className="text-right">2.920</td>
                          <td className="text-right">53.23%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/DE.png")}
                              />
                            </div>
                          </td>
                          <td>Germany</td>
                          <td className="text-right">1.300</td>
                          <td className="text-right">20.43%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/AU.png")}
                              />
                            </div>
                          </td>
                          <td>Australia</td>
                          <td className="text-right">760</td>
                          <td className="text-right">10.35%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/GB.png")}
                              />
                            </div>
                          </td>
                          <td>United Kingdom</td>
                          <td className="text-right">690</td>
                          <td className="text-right">7.87%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/RO.png")}
                              />
                            </div>
                          </td>
                          <td>Romania</td>
                          <td className="text-right">600</td>
                          <td className="text-right">5.94%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/BR.png")}
                              />
                            </div>
                          </td>
                          <td>Brasil</td>
                          <td className="text-right">550</td>
                          <td className="text-right">4.34%</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col className="ml-auto mr-auto" md="6">
                    <VectorMap
                      map={"world_mill"}
                      backgroundColor="transparent"
                      zoomOnScroll={false}
                      containerStyle={{
                        width: "100%",
                        height: "300px",
                      }}
                      regionStyle={{
                        initial: {
                          fill: "#e4e4e4",
                          "fill-opacity": 0.9,
                          stroke: "none",
                          "stroke-width": 0,
                          "stroke-opacity": 0,
                        },
                      }}
                      series={{
                        regions: [
                          {
                            values: mapData,
                            scale: ["#AAAAAA", "#444444"],
                            normalizeFunction: "polynomial",
                          },
                        ],
                      }}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </div>
    </>
  );
};

export default InstallMetrics;
