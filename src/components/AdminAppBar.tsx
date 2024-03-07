import { Link } from "react-router-dom";
import { StoreData } from "../types";

interface AppBarProps {
  storeData: StoreData | null;
}

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
              {storeData?.name || "ร้านพี่หมี"}
            </h5>
            <div className="dropdown">
              <button className="dropdown-button"> &#9660;</button>
              <div className="dropdown-content">
                <Link to="/admin">แดชบอร์ด</Link>
                <Link to="/adminstore">จัดการร้านค้า</Link>
                <Link to="/adminoption">ตั้งค่า</Link>
                <Link to="/login">หน้า login</Link>
                <Link to="/admin">หน้า admin</Link>
                <hr className="divider" />
                <button className="dropdown-link-button">ออกจากระบบ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
