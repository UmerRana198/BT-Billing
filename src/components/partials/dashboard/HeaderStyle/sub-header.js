import React, { memo, Fragment } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
//img
import topHeader from "../../../../assets/images/dashboard/top-header.png";
import topHeader1 from "../../../../assets/images/dashboard/top-header1.png";
import topHeader2 from "../../../../assets/images/dashboard/top-header2.png";
import topHeader3 from "../../../../assets/images/dashboard/top-header3.png";
import topHeader4 from "../../../../assets/images/dashboard/top-header4.png";
import topHeader5 from "../../../../assets/images/dashboard/top-header5.png";

const SubHeader = memo((props) => {
  return (
    <Fragment>
      <div className="iq-navbar-header">
        <Container fluid className="iq-container">
          <Row>
            <Col md={8} className="d-flex align-items-center" style={{ marginLeft:'`10px'}}>
              <h3 >Configuration</h3>
            </Col>
            <Col md={3}>
              <div className="text-right">
                <p style={{ margin: "0 10px 0 0" }}>Created by: John Doe</p>
                <p style={{ margin: "0 10px 0 0" }}>Created on: {new Date().toLocaleDateString()}</p>
              </div>
            </Col>
          </Row>
        </Container>

        <div
          className="iq-header-img"
          style={{ width: "80%", marginLeft: "50px", marginTop: "80px", height:'100px'}}
        >
          <img
            src={topHeader}
            alt="header"
            className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader1}
            alt="header"
            className="theme-color-purple-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader2}
            alt="header"
            className="theme-color-blue-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader3}
            alt="header"
            className="theme-color-green-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader4}
            alt="header"
            className="theme-color-yellow-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader5}
            alt="header"
            className="theme-color-pink-img img-fluid w-100 h-100 animated-scaleX"
          />
        </div>
      </div>
      <style>
        {`
          @media (max-width: 80px) {
            .iq-navbar-header {
              height: auto;
              padding-bottom: 20px; /* Add padding for spacing between elements */
            }
            .iq-header-img {
              height: auto;
              width: 100%;
              margin: 20px 0; /* Adjust margin for spacing */
            }
          }
        `}
      </style>
    </Fragment>
  );
});

export default SubHeader;