import React from "react";
import Swal from "sweetalert2";
import { Redirect, useParams } from "react-router-dom";

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
  const [syncingError, setSyncingError] = React.useState(false);
  const { initialSync } = useParams();

  // React.useEffect(() => {
  //   const initialSyncBoolean = initialSync === true;
  //   syncShopifyPartnerData(initialSyncBoolean).then(({ message }) => {
  //     if (message === "No Matching AppID") {
  //       Swal.fire({
  //         position: "top",
  //         icon: "error",
  //         title: `No Matching App ID Found. Please Update Your App ID`,
  //         showConfirmButton: false,
  //         onConfirm: false,
  //         timer: 6000,
  //       });
  //       setSyncingError(true);
  //     } else {
  //       setSyncing(false);
  //     }
  //   });
  // }, []);

  if (syncingError) {
    return <Redirect to="/admin/user-profile" />;
  }

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
                    Please Wait for Your Data to Sync... (Please Leave This Tab
                    Open)
                  </CardTitle>
                  <div className="lds-dual-ring"></div>
                </div>
                {/* <div className="progress-container progress-primary">
                  <span className="progress-badge">Sync Progress</span>
                  <Progress max="100" value="60">
                    <span className="progress-value">60%</span>
                  </Progress>
                </div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SyncData;
