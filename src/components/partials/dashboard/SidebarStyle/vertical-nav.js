import React, { useState, useContext, memo, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";

import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Import the icon
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"; // Import the "AdminPanelSettings" icon


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
  //location
  let location = useLocation();
  return (

    <Fragment  >
      <Accordion as="ul" className="navbar-nav iq-main-menu" width='20px' >
          {/* <li>
            <hr className="hr-horizontal" />
          </li> */}
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Pages</span>
            <span className="mini-icon">-</span>
          </Link>
        </li>
        <Accordion.Item
          as="li"
          eventKey="sidebar-special"
          bsPrefix={`nav-item ${active === "special" ? "active" : ""} `}
          onClick={() => setActive("special")}
        >
          <CustomToggle
            eventKey="sidebar-special"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            
            <GroupIcon/>
            <span className="item-name">Customer</span>
            
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-special">
            <ul className="sub-nav">
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/billing"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/customer"
                >
                   <PersonAddIcon />
                  <i className="sidenav-mini-icon"></i>
                  <span className="item-name">Add Customer</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/special-pages/kanban"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/viewcustomer"
                >
                 <SearchIcon/>
                  <i className="sidenav-mini-icon"></i>
                  <span className="item-name">View Customer</span>
                </Link>
              </li>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>


        <Accordion.Item
          as="li"
          eventKey="configuration"
          bsPrefix={`nav-item ${active === "configuration" ? "active" : ""} `}
          onClick={() => setActive("configuration")}
        >
          <CustomToggle
            eventKey="configuration"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
          
            <GroupIcon/>
            <span className="item-name">Configuration</span>
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
          <Accordion.Collapse eventKey="configuration">
            <ul className="sub-nav">
             
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/special-pages/billing"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/configuration"
                >
                  
                  <PersonAddIcon/>
                  <i className="sidenav-mini-icon"></i>
                  <span className="item-name">Add Configuration</span>
                </Link>
              </li>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>





        <Accordion.Item
          as="li"
          eventKey="sidebar-configuration"
          bsPrefix={`nav-item ${active === "configuration" ? "active" : ""} `}
          onClick={() => setActive("configuration")}
        >
          <CustomToggle
            eventKey="sidebar-configuration"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
           <AdminPanelSettingsIcon />
            <span className="item-name">Admin</span>
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
          <Accordion.Collapse eventKey="sidebar-configuration">
            <ul className="sub-nav">
             
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/special-pages/billing"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/RegisterUser"
                >
                <PersonAddIcon/>
                  <i className="sidenav-mini-icon"></i>
                  <span className="item-name">Register User</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/special-pages/kanban"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/viewuser"
                >
                 <SearchIcon/>
                  <i className="sidenav-mini-icon"></i>
                  <span className="item-name">View User</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/special-pages/kanban"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/updatepass"
                >
                 <PersonAddIcon/>
                  <i className="sidenav-mini-icon"></i>
                  <span className="item-name">Update Password</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/special-pages/kanban"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/additem"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <i className="sidenav-mini-icon"></i>
                  <span className="item-name">Add item</span>
                </Link>
              </li>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>


       
      </Accordion>
    </Fragment>
    
  );
});

export default VerticalNav;
