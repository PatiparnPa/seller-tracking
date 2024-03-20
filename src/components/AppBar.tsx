import { Link } from "react-router-dom";
import { StoreData } from "../types";

interface AppBarProps {
  storeData: StoreData | null;
}

const handleLogout = () => {
  // Delete access token from the cookie
  document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  // Redirect to the login page or any other page you prefer
  window.location.href = "/login"; // Example: Redirect to the login page
};


export const AppBar: React.FC<AppBarProps> = ({ storeData }) => {
  return (
    <>
      <div className="app-bar">
        <Link to="/" style={{ textDecoration: "none", color: "#FFFFFF" }}>
          <h5>IT Cafeteria</h5>
        </Link>
        <div className="right-elements">
          <div className="elements-container">
            <div className="customer-picture" style={{ backgroundColor: storeData?.store_img_url ? "transparent" : "#D9D9D9" }}>
              {storeData?.store_img_url ? (
                <img
                  src={storeData.store_img_url}
                  alt="Store"
                />
              ) : null}
            </div>
            <h5 style={{ color: "#FFFFFF" }}>{storeData?.name || "ชื่อร้านค้า"}</h5>
            <div className="dropdown">
              <button className="dropdown-button"> &#9660;</button>
              <div className="dropdown-content">
                <Link to="/editstore">แก้ไขข้อมูลร้านค้า</Link>
                <Link to="/menulist">จัดการเมนู</Link>
                <Link to="/report">ดูรายงานการขาย</Link>
                <Link to="/login">หน้า login</Link>
                <Link to="/admin">หน้า admin</Link>
                <hr className="divider" />
                <button className="dropdown-link-button" onClick={handleLogout}>ออกจากระบบ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
