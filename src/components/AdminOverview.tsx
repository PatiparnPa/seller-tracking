import { AppBar } from "./AppBar";
import Sidebar from "./SideBar";

export const AdminOverview = () => {
  return (
    <div style={{ display: "flex", height: "90vh" }}>
      <Sidebar />
      <div style={{ flex: 1, paddingLeft: "200px", paddingRight: "20px" }}>
        <div className="report-content-row">
          <div className="report-content">
            <h4>จำนวนร้านค้า</h4>
            <h1>500</h1>
          </div>
          <div className="report-content">
            <h4>จำนวนลูกค้า</h4>
            <h1>5000</h1>
          </div>
          <div className="report-content">
            <h4>จำนวนออเดอร์</h4>
            <h1>1000</h1>
          </div>
        </div>
      </div>
    </div>
  );
};