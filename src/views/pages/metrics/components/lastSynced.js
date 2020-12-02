import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

import { getLastSynced } from "../../../../api/metrics";

const LastSynced = () => {
  const [lastSynced, setLastSynced] = React.useState("");

  React.useEffect(() => {
    getLastSynced().then((lastSync) => {
      setLastSynced(lastSync);
    });
  }, []);

  return (
    <Row>
      <Col>
        <Card>
          <CardBody className="text-white">
            Your Data was last synced: {lastSynced} minute(s) ago
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default LastSynced;
