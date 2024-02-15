import React, { useState, useContext, memo, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Cookies from "js-cookie";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;
  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const VerticalNav = memo((props) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [active, setActive] = useState("");
  let location = useLocation();

  // Move the declaration of hasElectricityEditorRights here
  const electricityrights = Cookies.get("electricityrights");
  const maintenancerights = Cookies.get("maintenancerights");
  const hasElectricityEditorRights =
    electricityrights &&
    (electricityrights.includes("electricityeditor") ||
      electricityrights.includes("electricityadmin") ||
      electricityrights.includes("electricitymanager"));


      const hasMaintenanceEditorRights =
      electricityrights &&
      (electricityrights.includes("maintenanceeditor") ||
        electricityrights.includes("maintenanceadmin") ||
        electricityrights.includes("maintenancemanager"));

  return (
    <Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu" width="20px">
        {/* ... (previous code) */}
        <Accordion.Item
          as="li"
          eventKey="customer"
          bsPrefix={`nav-item ${active === "customer" ? "active" : ""} `}
          onClick={() => setActive("customer")}
        >
          <CustomToggle
            eventKey="customer"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <GroupIcon />
            <span className="item-name">Electric Customer</span>
            <i className="right-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="customer">
            <ul className="sub-nav">
              {/* Conditional rendering for "Add Customer" */}
              {hasElectricityEditorRights && (
                <li className="nav-item">
                  <Link
                    className={`${
                      location.pathname === "/dashboard/billing" ? "active" : ""
                    } nav-link`}
                    to="/dashboard/Home/customer"
                  >
                    <PersonAddIcon />
                    <i className="sidenav-mini-icon"></i>
                    <span className="item-name">Add Customer</span>
                  </Link>
                </li>
              )}

              {/* Conditional rendering for "View Customer" */}
              {electricityrights &&
      (electricityrights.includes('electricityreader') ||
        electricityrights.includes('electricityadmin') ||
        electricityrights.includes('electricitymanager') ||
        electricityrights.includes('electricityeditor')) ? (
                <li className="nav-item">
                  <Link
                    className={`${
                      location.pathname === "/dashboard/special-pages/kanban"
                        ? "active"
                        : ""
                    } nav-link`}
                    to="/dashboard/Home/ViewCustomer"
                  >
                    <SearchIcon />
                    <i className="sidenav-mini-icon"></i>
                    <span className="item-name">View Customer</span>
                  </Link>
                </li>
              ): (
                // Display an alert message or take any other action
                <div>
                  <p>You do not have the required rights to perform this action.</p>
                  {/* You can customize the alert message or take any other action */}
                </div>
              )}
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>




        
      </Accordion>
    </Fragment>
  );
});

export default VerticalNav;
