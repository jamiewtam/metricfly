import React from "react";
import { Redirect } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Progress,
  CardTitle,
  Container,
} from "reactstrap";

import { syncShopifyPartnerData } from "../../api/sync/dataFetching";

const SyncData = () => {
  const [syncing, setSyncing] = React.useState(true);

  React.useEffect(() => {
    syncShopifyPartnerData(false).then(() => {
      setSyncing(false);
    });
  }, []);

  if (!syncing) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <div className="content">
      <Container>
        <Row className="justify-content-center">
          <Col md="12">
            <Card className="justify-content-center">
              <CardHeader style={{ textAlign: "center" }}>
                <h2>Syncing Your Shopify Partner Data</h2>
              </CardHeader>
              <CardBody>
                <div style={{ textAlign: "center" }}>
                  <CardTitle tag="h4">
                    Please Wait for Your Data to Sync...
                  </CardTitle>
                  <div className="lds-dual-ring"></div>
                </div>
                <div className="progress-container progress-primary">
                  <span className="progress-badge">Sync Progress</span>
                  <Progress max="100" value="60">
                    <span className="progress-value">60%</span>
                  </Progress>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SyncData;
