import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";

export const AdminOverview = () => {
  const [storeCount, setStoreCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch store count
        const storeResponse = await fetch(
          "https://order-api-patiparnpa.vercel.app/stores/"
        );
        const storeData = await storeResponse.json();
        setStoreCount(storeData.length);

        // Fetch user count
        const userResponse = await fetch(
          "https://order-api-patiparnpa.vercel.app/users"
        );
        const userData = await userResponse.json();
        setUserCount(userData.length);

        // Fetch order count
        const orderResponse = await fetch(
          "https://order-api-patiparnpa.vercel.app/orders"
        );
        const orderData = await orderResponse.json();
        setOrderCount(orderData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", height: "80vh" }}>
      <Sidebar />
      <div style={{ flex: 1, paddingLeft: "200px", paddingRight: "20px" }}>
        <div className="report-content-row">
          <div className="report-content">
            <h4>จำนวนร้านค้า</h4>
            <h1>{storeCount || 0}</h1>
          </div>
          <div className="report-content">
            <h4>จำนวนผู้ใช้งาน</h4>
            <h1>{userCount || 0}</h1>
          </div>
          <div className="report-content">
            <h4>จำนวนออเดอร์</h4>
            <h1>{orderCount || 0}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
