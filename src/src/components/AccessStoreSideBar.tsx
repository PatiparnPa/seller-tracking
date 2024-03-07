import { Link, useLocation } from "react-router-dom";
import storeIcon from "../assets/store.jpg";
import cafeIcon from "../assets/it-cafe.jpg";
import dashboardIcon from "../assets/dashboard.jpg";
import optionIcon from "../assets/option.jpg";

export const AccessSideBar = () => {
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
          &lt; กลับสู่หน้าแอดมิน
        </Link>
      </div>
    </>
  );
};
