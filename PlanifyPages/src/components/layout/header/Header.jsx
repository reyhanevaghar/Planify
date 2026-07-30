import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("UserToken");
    navigate("/signin");
  };

  return (
    <header
      id="page-header"
      style={{
        background: "linear-gradient(90deg, #111827, #1f2937)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
      }}
    >
      <div className="content-header d-flex justify-content-between align-items-center px-4 py-3">
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          <button
            type="button"
            className="btn"
            data-toggle="layout"
            data-action="sidebar_toggle"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)"
            }}
          >
            <i className="fa fa-fw fa-bars" />
          </button>

          <div className="d-flex flex-column justify-content-center">
            <span style={{ color: "#fff", fontWeight: "700", fontSize: "18px" }}>
              Planify
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="dropdown d-inline-block">
            <button
              type="button"
              className="btn d-flex align-items-center"
              id="page-header-user-dropdown"
              data-toggle="dropdown"
              style={{
                height: "42px",
                borderRadius: "14px",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "0 10px 0 8px",
                gap: "10px"
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #60a5fa, #2563eb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "13px",
                  color: "#fff"
                }}
              >
                P
              </div>
              <span className="d-none d-sm-inline-block" style={{ fontWeight: "600" }}>
                Profile
              </span>
              <i className="fa fa-angle-down d-none d-sm-inline-block" />
            </button>

            <div
              className="dropdown-menu dropdown-menu-right border-0 p-2"
              aria-labelledby="page-header-user-dropdown"
              style={{
                minWidth: "220px",
                borderRadius: "16px",
                marginTop: "12px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.18)"
              }}
            >
              <Link to="/myprofile" className="dropdown-item rounded-3 py-2">
                <i className="far fa-user mr-2" /> My Profile
              </Link>
              <Link to="/tasks" className="dropdown-item rounded-3 py-2">
                <i className="far fa-list-alt mr-2" /> My Tasks
              </Link>

              <div className="dropdown-divider" />

              <button
                className="dropdown-item rounded-3 py-2 text-danger"
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                <i className="far fa-arrow-alt-circle-left mr-2" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
