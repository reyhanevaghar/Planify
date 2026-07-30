import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("UserToken");
    navigate("/signin");
  };

  return (
    <nav
      id="sidebar"
      style={{
        background: "linear-gradient(180deg, #111827, #1f2937)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "10px 0 30px rgba(0,0,0,0.12)"
      }}
    >
      <div
        className="content-header"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)"
        }}
      >
        <Link
          className="font-w700 text-white text-decoration-none"
          to="/home"
          style={{
            letterSpacing: "0.3px",
            fontSize: "16px"
          }}
        >
          <span className="smini-visible">
            <i className="fa fa-tasks"></i>
          </span>
          <span className="smini-hidden">Planify</span>
        </Link>
      </div>

      <div className="js-sidebar-scroll">
        <div className="content-side py-3">
          <div className="mb-4 px-2">
            <Link
              to="/addtask"
              className="btn btn-block d-flex align-items-center justify-content-center"
              style={{
                height: "44px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#fff",
                fontWeight: "600",
                border: "none",
                boxShadow: "0 10px 25px rgba(37,99,235,0.28)"
              }}
            >
              <i className="fa fa-plus mr-2"></i>
              Add Task
            </Link>
          </div>

          <div
            className="content-side-heading px-2"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "11px",
              letterSpacing: "1px"
            }}
          >
            MAIN
          </div>

          <ul className="nav-main">
            <li className="nav-main-item">
              <Link
                className="nav-main-link"
                to="/tasks"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  borderRadius: "12px",
                  margin: "4px 8px",
                  transition: "0.2s ease"
                }}
              >
                <i
                  className="nav-main-link-icon fa fa-list"
                  style={{ color: "#93c5fd" }}
                ></i>
                <span className="nav-main-link-name">All Tasks</span>
              </Link>
            </li>
          </ul>

          <div
            className="content-side-heading px-2 mt-4"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "11px",
              letterSpacing: "1px"
            }}
          >
            TASKS
          </div>

          <ul className="nav-main">
            <li className="nav-main-item">
              <Link
                className="nav-main-link"
                to="/monthlytask"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  borderRadius: "12px",
                  margin: "4px 8px",
                  transition: "0.2s ease"
                }}
              >
                <i
                  className="nav-main-link-icon fa fa-calendar"
                  style={{ color: "#86efac" }}
                ></i>
                <span className="nav-main-link-name">Monthly Tasks</span>
              </Link>
            </li>

            <li className="nav-main-item">
              <Link
                className="nav-main-link"
                to="/mycalender"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  borderRadius: "12px",
                  margin: "4px 8px",
                  transition: "0.2s ease"
                }}
              >
                <i
                  className="nav-main-link-icon fa fa-calendar-alt"
                  style={{ color: "#f9a8d4" }}
                ></i>
                <span className="nav-main-link-name">Calendar</span>
              </Link>
            </li>
          </ul>

          <div
            className="content-side-heading px-2 mt-4"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "11px",
              letterSpacing: "1px"
            }}
          >
            ACCOUNT
          </div>

          <ul className="nav-main">
            <li className="nav-main-item">
              <Link
                className="nav-main-link"
                to="/myprofile"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  borderRadius: "12px",
                  margin: "4px 8px",
                  transition: "0.2s ease"
                }}
              >
                <i
                  className="nav-main-link-icon fa fa-user-circle"
                  style={{ color: "#67e8f9" }}
                ></i>
                <span className="nav-main-link-name">Profile</span>
              </Link>
            </li>

            <li className="nav-main-item">
              <button
                onClick={handleLogout}
                className="nav-main-link"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  borderRadius: "12px",
                  margin: "4px 8px",
                  transition: "0.2s ease",
                  background: "transparent",
                  border: "none",
                  width: "calc(100% - 16px)",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 14px"
                }}
              >
                <i
                  className="nav-main-link-icon fa fa-sign-out-alt"
                  style={{ color: "#fca5a5", marginRight: "10px" }}
                ></i>
                <span className="nav-main-link-name">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
