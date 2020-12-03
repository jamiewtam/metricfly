import React, { Component } from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import { getMerchantData } from "../../../api/merchants";
import Loading from "../../../util/Loading/Loading";

class ReactTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    getMerchantData().then((dataTable) => {
      dataTable.sort((a, b) => {
        return b.active - a.active;
      });

      this.setState({
        loading: false,
        data: dataTable.map((prop, key) => {
          let isActive = "False",
            isTrial = "-",
            isPaid = "-";

          prop.trial
            ? (isTrial = (
                <div className="badge badge-success">Trial Merchant</div>
              ))
            : (isPaid = (
                <div className="badge badge-success actions-right">
                  Paying Merchant
                </div>
              ));
          if (prop.active) {
            isActive = <div className="badge badge-success">Active</div>;
          } else {
            isActive = <div className="badge badge-danger">Inactive</div>;
            isPaid = "-";
            isTrial = "-";
          }

          const lifetimeDays = (
            <div className="badge badge-info">{prop.lifetime} days</div>
          );

          return {
            id: key,
            name: prop.merchantName,
            active: isActive,
            trial: isTrial,
            paid: isPaid,
            lifetime: lifetimeDays,
            actions: <Button>Timeline</Button>,
          };
        }),
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <>
        <div className="content">
          <Col md={8} className="ml-auto mr-auto">
            <h2 className="text-center"> Shopify Merchant Breakdown.</h2>
            <p className="text-center">
              Find your past and present Shopify merchants all in one place.
            </p>
          </Col>
          <Row className="mt-5">
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Merchants</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.data}
                    filterable
                    resizable={true}
                    columns={[
                      {
                        Header: "Store",
                        accessor: "name",
                        sortable: false,
                      },
                      {
                        Header: "Active",
                        accessor: "active",
                      },
                      {
                        Header: "Trial Status",
                        accessor: "trial",
                      },
                      {
                        Header: "Paid Status",
                        accessor: "paid",
                      },
                      {
                        Header: "Lifetime",
                        accessor: "lifetime",
                        sortable: false,
                      },

                      {
                        Header: "Actions",
                        accessor: "actions",
                        sortable: false,
                        filterable: false,
                      },
                    ]}
                    defaultPageSize={100}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ReactTables;
