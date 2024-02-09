import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar } from "./AppBar";
import { StoreData } from "../types";

interface HomePageProps {
  storeData: StoreData | null;
}

export const HomePage = () => {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    // Fetch the products from the API
    fetch(
      "https://order-api-patiparnpa.vercel.app/products/store/65a39b4ae668f5c8329fac98"
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
      <div className="header">
        <div className="left-text">เมนูที่เปิดขาย (มี {productCount} เมนู)</div>
        <Link to="/menulist" className="right-text">
          แก้ไขข้อมูลสินค้า
        </Link>
      </div>
      <div className="button-group">
        <Link to="/front" className="big-rounded-button">
          <b>Open Store</b>
        </Link>
      </div>
      <p style={{ textAlign: "center", color: "black", marginTop: "4px" }}>
        **กด Open Store เพื่อเริ่มต้นการขาย**
      </p>
    </>
  );
};
