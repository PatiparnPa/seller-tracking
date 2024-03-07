import { Link, useLocation } from "react-router-dom";
import storeIcon from "../assets/store.jpg";
import cafeIcon from "../assets/it-cafe.jpg";
import dashboardIcon from "../assets/dashboard.jpg";
import optionIcon from "../assets/option.jpg";

const Sidebar = () => {
  const imageStyle = {
    width: "48px",
    height: "48px",
    marginRight: "8px",
  };

  const activeLinkStyle = {
    color: "#2357A5",
    fontWeight: "bold",
  };

  const location = useLocation();

  return (
    <>
    <div className="sidebar">
      <img
        src={cafeIcon}
        alt="Cafe Icon"
        style={{
          width: "60px",
          height: "60px",
          marginLeft: "34%",
          marginBottom: "10%",
        }}
      ></img>
      <Link
        to="/admin"
        className="sidebar-link"
        style={location.pathname === "/admin" ? activeLinkStyle : {}}
      >
        <img src={dashboardIcon} alt="Dashboard Icon" style={imageStyle}></img>
        แดชบอร์ด
      </Link>
      <Link
        to="/adminstore"
        className="sidebar-link"
        style={location.pathname === "/adminstore" ? activeLinkStyle : {}}
      >
        <img src={storeIcon} alt="Store Icon" style={imageStyle}></img>
        จัดการร้านค้า
      </Link>
      <Link
        to="/adminoption"
        className="sidebar-link"
        style={location.pathname === "/adminoption" ? activeLinkStyle : {}}
      >
        <img src={optionIcon} alt="Option Icon" style={imageStyle}></img>
        ตั้งต่า
      </Link>
    </div>
    </>
  );
};

export default Sidebar;
