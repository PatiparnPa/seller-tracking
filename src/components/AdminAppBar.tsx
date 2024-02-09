import { Link } from "react-router-dom";
import { StoreData } from "../types";

interface AppBarProps {
  storeData: StoreData | null;
}

export const AdminAppBar: React.FC<AppBarProps> = ({ storeData }) => {
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
            <h5 style={{ color: "#FFFFFF" }}>{storeData?.name || "ร้านพี่หมี"}</h5>
            <div className="dropdown">
              <button className="dropdown-button"> &#9660;</button>
              <div className="dropdown-content">
                <Link to="/editstore">แก้ไขข้อมูลร้านค้า</Link>
                <Link to="/menulist">จัดการเมนู</Link>
                <Link to="/report">ดูรายงานการขาย</Link>
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
