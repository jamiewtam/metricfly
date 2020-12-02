import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  CardTitle,
  Container,
} from "reactstrap";

const WaitToAccept = () => {
  return (
    <div className="content">
      <Container>
        <Row className="justify-content-center">
          <Col md="12">
            <Card className="justify-content-center">
              <CardHeader style={{ textAlign: "center" }}>
                <h2>The Pre Sync Page</h2>
              </CardHeader>
              <CardBody>
                <div style={{ textAlign: "center" }}>
                  <CardTitle tag="h4">
                    We are currently in beta... Please wait for us to accept
                    your request so we can start syncing your data :) We will
                    email you as soon as we accept!
                  </CardTitle>
                  <div className="lds-dual-ring"></div>

                  <p>
                    While you wait you can browser around (without your data)
                  </p>
                  <Link to="/admin/dashboard">
                    <Button>Start Browsing Now</Button>
                  </Link>
                  <h4 style={{ marginTop: "30px" }}>
                    P.S. If you have any questions email us at
                    metricflyapp@gmail.com. Everything is also free during the
                    beta!
                  </h4>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WaitToAccept;
