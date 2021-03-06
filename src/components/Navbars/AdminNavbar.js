import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  UncontrolledTooltip,
} from "reactstrap";

import { Link } from "react-router-dom";
import { AuthContext } from "../../util/Context/auth-context";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
      alert: false,
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-dark",
      });
    } else {
      this.setState({
        color: "navbar-transparent",
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent",
      });
    } else {
      this.setState({
        color: "bg-white",
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch,
    });
  };

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };
  render() {
    if (
      this.context.user &&
      this.context.user.appIDsAndTrialPeriods &&
      this.context.user.appIDsAndTrialPeriods.length === 0 &&
      this.state.alert === false
    ) {
      this.setState({
        alert: (
          <ReactBSAlert
            error
            style={{ display: "block", marginTop: "-100px" }}
            title="At least one app ID is required. Please enter in a new one."
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnBsStyle="error"
            btnSize=""
          >
            Please enter in a new app ID You can use <b>bold</b> text,{" "}
            <Link to="/admin/user-profile">here</Link>
          </ReactBSAlert>
        ),
      });
    }
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", {
            [this.state.color]:
              this.props.location.pathname.indexOf("full-screen-map") === -1,
          })}
          expand="lg"
        >
          {this.state.alert}
          <Container fluid>
            <div className="navbar-wrapper">
              <div className="navbar-minimize d-inline">
                <Button
                  className="minimize-sidebar btn-just-icon"
                  color="link"
                  id="tooltip209599"
                  onClick={this.props.handleMiniClick}
                >
                  <i className="tim-icons icon-align-center visible-on-sidebar-regular" />
                  <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini" />
                </Button>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip209599"
                  placement="right"
                >
                  Sidebar toggle
                </UncontrolledTooltip>
              </div>
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened,
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand onClick={(e) => e.preventDefault()}>
                {this.props.brandText} -
                {this.context.user &&
                this.context.user.appIDsAndTrialPeriods.length > 0
                  ? this.context.user.appIDsAndTrialPeriods[0].appID
                  : null}
              </NavbarBrand>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navigation"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                {/* <InputGroup className="search-bar" tag="li">
                  <Button
                    color="link"
                    data-target="#searchModal"
                    data-toggle="modal"
                    id="search-button"
                    onClick={this.toggleModalSearch}
                  >
                    <i className="tim-icons icon-zoom-split" />
                    <span className="d-lg-none d-md-block">Search</span>
                  </Button>
                </InputGroup>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                  >
                    <div className="notification d-none d-lg-block d-xl-block" />
                    <i className="tim-icons icon-sound-wave" />
                    <p className="d-lg-none">Notifications</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Mike John responded to your email
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        You have 5 more tasks
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Your friend Michael is in town
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Another notification
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Another one
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown> */}

                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-single-02" />
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none">Settings/Log Out</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <Link to="/admin/user-profile">
                        <DropdownItem className="nav-item">
                          Settings
                        </DropdownItem>
                      </Link>
                    </NavLink>
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li">
                      <Link to="/auth/logout">
                        <DropdownItem className="nav-item">
                          Log out
                        </DropdownItem>
                      </Link>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header">
            <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModalSearch}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

export default AdminNavbar;
