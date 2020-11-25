import React from "react";

import { Card, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";

export const MetricCardWithFooter = ({
  title,
  amount,
  color,
  icon,
  footer,
}) => {
  return (
    <Col lg="3" md="6">
      <Card className="card-stats">
        <CardBody>
          <Row>
            <Col xs="5">
              <div className={`info-icon text-center icon-${color}`}>
                <i className={`tim-icons icon-${icon}`} />
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">{title}</p>
                <CardTitle tag="h3">{amount}</CardTitle>
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <hr />
          <div className="stats">{footer}</div>
        </CardFooter>
      </Card>
    </Col>
  );
};

export const MetricCard = ({ title, amount, color, icon }) => {
  return (
    <Col lg="3" md="6">
      <Card className="card-stats">
        <CardBody>
          <Row>
            <Col xs="5">
              <div className={`info-icon text-center icon-${color}`}>
                <i className={`tim-icons icon-${icon}`} />
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">{title}</p>
                <CardTitle tag="h3">{amount}</CardTitle>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};
