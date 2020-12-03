import React from "react";
import FacebookLogin from "react-facebook-login";
import "../../../../assets/css/custom.css";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { AuthContext } from "../../../../util/Context/auth-context";
import { addFacebookAccessToken } from "../../../../api/user/index";

const sendAccessTokenAndAccounts = async (accessToken, adAccounts) => {
  // await addFacebookAccessToken(accessToken);
};

const AdAccounts = () => {
  const responseFacebook = async (response) => {
    console.log("resp0onse running");
    const { authResponse } = response;

    const accessToken = authResponse.accessToken;

    // try {
    //   const adAccountArr = [];

    //   window.FB.api("/me/adaccounts", function (userAdAccounts) {
    //     console.log("userAdAccounts:", userAdAccounts);
    //     userAdAccounts.data.forEach((el) => adAccountArr.push(el.id));
    //   });
    //   setTimeout(() => {
    //     try {
    //       window.FB.api("/me/businesses", function (businessManagers) {
    //         if (businessManagers.data) {
    //           businessManagers.data.forEach((el) => {
    //             window.FB.api(
    //               `${el.id}/owned_ad_accounts`,
    //               function (ownedAdAccounts) {
    //                 ownedAdAccounts.data.forEach((el) => {
    //                   adAccountArr.push(el.id);
    //                 });

    //                 // renderExpenses(userAccessTokentoSend, adAccountArr);
    //               }
    //             );
    //           });
    //           console.log(accessToken, adAccountArr);
    //         } else {
    //           console.log(accessToken, adAccountArr);
    //           // renderExpenses(userAccessTokentoSend, adAccountArr);
    //         }
    //       });
    //     } catch (err) {
    //       console.log(err);
    //       // renderExpenses(userAccessTokentoSend, adAccountArr);
    //     }
    //   }, 2000);
    // } catch (err) {
    //   console.log(err);
    //   // Swal.fire({
    //   //   position: "top",
    //   //   icon: "error",
    //   //   title: "Error",
    //   //   html: `${err}`,
    //   //   showConfirmButton: false,
    //   //   timer: 4000,
    //   // });
    //   console.log(err);
    // }
  };

  const statusChangeCallback = (response) => {
    console.log(response);
    if (response.status === "connected") {
      responseFacebook(response);
    } else if (response.status === "not_authorized") {
      console.log("Please log into this app.");
    } else {
      console.log("Please log into this facebook.");
    }
  };

  const checkLoginState = () => {
    window.FB.getLoginStatus((response) => {
      statusChangeCallback(response);
    });
  };

  const handleFBLogin = () => {
    window.FB.login(checkLoginState());
  };

  React.useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "175168940924367",
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: "v7.0", // Use this Graph API version for this call.
      });
    };
    // LOADS SDK
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Ad Accounts</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="10"></Col>
                    <Col className="pr-md-1" md="10">
                      <p>Log Into Facebook (COMING SOON)</p>
                      {/* 
                      <FacebookLogin
                        appId="175168940924367"
                        fields="name"
                        cssClass="facebook-button"
                        scope="ads_read"
                        version="7.0"
                        // onClick={componentClicked}
                        callback={responseFacebook}
                      /> */}
                      <Button
                        // classNames="btn-facebook"
                        // id="btn-social-login"
                        onClick={handleFBLogin}
                      >
                        Sign in with Facebook
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdAccounts;
