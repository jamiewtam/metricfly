import React from "react";
import moment from "moment";
import classNames from "classnames";
import { Line } from "react-chartjs-2";
//COMPONENTS
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
import LastSynced from "./components/lastSynced";
import Loading from "../../../util/Loading/Loading";
import {
  CalendarComponent,
  ShowCalendarBackdrop,
  CalenderInput,
} from "../../../components/Calendar/Calendar";
import { AppEventSection } from "./components/eventHistory";
//FUNCTIONS
import { chartOptions } from "../../../api/metrics/factoryFunctions/formatChartData";
import { useShowCalendar } from "../../../util/hooks/useShowCalendar";
import { metricReducer } from "./components/metricComponents";
import { getInstalMetrics } from "../../../api/metrics";

const InstallMetrics = () => {
  const [state, dispatch] = React.useReducer(metricReducer, {
    merchants: 0,
    trialMerchants: 0,
    paidMerchants: 0,
    netMerchants: 0,
    installs: 0,
    uninstalls: 0,
    closedStores: 0,
    eventArr: [],
    installDataChart: [],
    userChurn: 0,
    reactivations: 0,
    LTV: 0,
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

    const endDateEndOfDay = moment(endDate.endDate)
      .endOf("day")
      .format("YYYY-MM-DD");

    getInstalMetrics(startDateStartOfDay, endDateEndOfDay).then((data) => {
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

  const setBgChartData = (name) => {
    setBigChartData(name);
  };

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
            title="Lifetime Value"
            amount={state.LTV.toFixed(2)}
            icon="molecule-40"
            footer="Customer Lifetime Value"
          />
          <MetricCardWithFooter
            color="warning"
            title="Reactivations"
            amount={state.reactivations}
            icon="triangle-right-17"
            footer="Re-opened Their Store"
          />
          <MetricCardWithFooter
            color="success"
            title="Closed Stores"
            amount={state.closedStores}
            icon="components"
            footer="Closed Their Store"
          />
          <MetricCardWithFooter
            color="success"
            title="User Churn (%)"
            amount={state.userChurn}
            icon="refresh-01"
            footer="% of User's Who Removed The App"
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
                  <tbody>
                    <AppEventSection state={state} />
                  </tbody>
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

export default InstallMetrics;
