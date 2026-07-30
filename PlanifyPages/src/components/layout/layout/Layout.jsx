import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      id="page-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <div style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
