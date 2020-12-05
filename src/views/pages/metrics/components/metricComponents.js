import React from "react";
import classNames from "classnames";
import { Line } from "react-chartjs-2";
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

import { chartOptions } from "../../../../api/metrics/factoryFunctions/formatChartData";

export const MultiTabLineChart = ({
  chartData,
  title,
  subTitleOne,
  subTitleTwo,
  subTitleThree,
  iconOne,
  iconTwo,
  iconThree,
}) => {
  const [bigChartData, setBigChartData] = React.useState("data1");

  const setBgChartData = (name) => {
    setBigChartData(name);
  };

  return (
    <Row>
      <Col xs="12">
        <Card className="card-chart">
          <CardHeader>
            <Row>
              <Col className="text-left" sm="6">
                <CardTitle tag="h2">{title}</CardTitle>
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
                      {subTitleOne}
                    </span>
                    <span className="d-block d-sm-none">
                      <i className={`tim-icons icon-${iconOne}`} />
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
                      {subTitleTwo}
                    </span>
                    <span className="d-block d-sm-none">
                      <i className={`tim-icons icon-${iconTwo}`} />
                    </span>
                  </Button>
                  {subTitleThree && (
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
                        {subTitleThree}
                      </span>
                      <span className="d-block d-sm-none">
                        <i className={`tim-icons icon-${iconThree}`} />
                      </span>
                    </Button>
                  )}
                </ButtonGroup>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Line data={chartData[bigChartData]} options={chartOptions} />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export const metricReducer = (state, action) => {
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

// EVENTS TABLE SECTION

const createTableHeaders = (headers) => {
  const lastValue = headers.length - 1;
  const middleHeaders = headers.map((header, index) => {
    if (index !== 0 && index !== lastValue) {
      return <th key={index}>{header}</th>;
    }
    return null;
  });

  return (
    <thead className="text-primary">
      <tr>
        <th className="text-center">{headers[0]}</th>
        {middleHeaders}
        <th style={{ width: "25%" }} className="text-center">
          {headers[lastValue]}
        </th>
      </tr>
    </thead>
  );
};

export const EventsTable = ({ headers, tableBody, title }) => {
  return (
    <Col lg="12">
      <Card>
        <CardHeader>
          <CardTitle tag="h5">{title}</CardTitle>
        </CardHeader>
        <CardBody
          style={{
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <Table>
            {createTableHeaders(headers)}
            <tbody>{tableBody}</tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};
