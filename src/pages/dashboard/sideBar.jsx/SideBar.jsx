import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilUser } from "@coreui/icons";
import "./Sidebar.css";

function SideBar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <div className="dashboard-header">
        <Button className="toggle-button" onClick={handleToggleSidebar}>
          <CIcon icon={cilUser} height={30} />
        </Button>
      </div>
      <div className={`sidebar ${showSidebar ? "show" : ""}`}>
        <Card className="h-100">
          <Card.Body>
            <div className="sidebar-links">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link to="/expenses" className="nav-link">
                    Expenses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/budget" className="nav-link">
                    Budget
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/income" className="nav-link">
                    Income
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <Button
              className="toggle-button toggle-button-bottom"
              onClick={handleToggleSidebar}
            >
              Close
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default SideBar;
