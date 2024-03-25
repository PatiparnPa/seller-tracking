import { AccessSideBar } from "./AccessStoreSideBar";
import Sidebar from "./SideBar";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";
import cafeIcon from "../assets/it-cafe.jpg";

export const AccessStorePage = () => {
  const { accessStoreId } = useParams();
  const [productCount, setProductCount] = useState(0);
  const location = useLocation();
  const [accessStoreName, setAccessStoreName] = useState('');
  const { storeId } = useUser();

  const activeLinkStyle = {
    color: "#2357A5",
    fontWeight: "bold",
  };

  useEffect(() => {
    // Fetch the products from the API
    if (accessStoreId) {
      fetch(
        `https://order-api-patiparnpa.vercel.app/products/store/${accessStoreId}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Assuming the API response is an array of products
          // Set the count of products
          setProductCount(data.length);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });

      // Fetch the access store name from the API
      fetch(`https://order-api-patiparnpa.vercel.app/stores/${accessStoreId}`)
        .then((response) => response.json())
        .then((data) => {
          // Set the access store name
          setAccessStoreName(data.name);
        })
        .catch((error) => {
          console.error("Error fetching access store data:", error);
        });
    }
  }, [accessStoreId]);
  return (
    <>
      <div style={{ display: "flex", height: "80vh" }}>
        <div className="sidebar">
          <img
            src={cafeIcon}
            alt="Cafe Icon"
            style={{
              width: "60px",
              height: "60px",
              marginLeft: "34%",
              marginBottom: "0%",
            }}
          ></img>
          <div className="sidebar-link" style={{ textAlign: "center" }}>
            {accessStoreName}
          </div>
          <Link
            to="/admin"
            className="sidebar-link"
            style={location.pathname === "/admin" ? activeLinkStyle : {}}
          >
            &lt; กลับสู่หน้าแอดมิน
          </Link>
        </div>
        <div style={{ flex: 1, paddingLeft: "200px", paddingRight: "20px" }}>
          <div className="header">
            <div className="left-text">
              เมนูที่เปิดขาย (มี {productCount} เมนู)
            </div>
            <Link to="" className="right-text">
              แก้ไขข้อมูลสินค้า
            </Link>
          </div>
          <div className="button-group">
            <Link to="" className="big-rounded-button">
              <b>Open Store</b>
            </Link>
          </div>
          <p style={{ textAlign: "center", color: "black", marginTop: "4px" }}>
            **กด Open Store เพื่อเริ่มต้นการขาย**
          </p>
          <div className="header" style={{ marginTop: "10%" }}>
            <Link
              to=""
              className="left-text"
              style={{ textDecoration: "none", color: "#2357A5" }}
            >
              ดูรายงานการขาย
            </Link>
            <Link to="" className="right-text">
              แก้ไขข้อมูลร้านค้า
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
