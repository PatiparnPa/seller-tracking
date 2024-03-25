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

export const AdminAppBar: React.FC<AppBarProps> = ({ storeData }) => {
  return (
    <>
      <div className="app-bar">
        <Link to="/admin" style={{ textDecoration: "none", color: "#FFFFFF" }}>
          <h5>IT Cafeteria</h5>
        </Link>
        <div className="right-elements">
          <div className="elements-container">
            <h5 style={{ color: "#FFFFFF" }}>
              {storeData?.name || "ชื่่อแอดมิน"}
            </h5>
            <div className="dropdown">
              <button className="dropdown-button"> &#9660;</button>
              <div className="dropdown-content">
                <Link to="/admin">แดชบอร์ด</Link>
                <Link to="/adminstore">จัดการร้านค้า</Link>
                <Link to="/adminoption">ตั้งค่า</Link>
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
