import { AccessSideBar } from "./AccessStoreSideBar";
import Sidebar from "./SideBar";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const AccessStorePage = () => {
  const { accessStoreId } = useParams();
  const [productCount, setProductCount] = useState(0);
  const storeId = "65a39b4ae668f5c8329fac98";

  useEffect(() => {
    // Fetch the products from the API
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
  }, []); // Empty dependency array to run effect only once on mount
  return (
    <>
      <div style={{ display: "flex", height: "80vh" }}>
        <AccessSideBar />
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
