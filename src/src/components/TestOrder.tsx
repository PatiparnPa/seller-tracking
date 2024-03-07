import { AppBar } from "./AppBar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TestOrder = () => {
  const navigate = useNavigate();
  const UserId = "6502b5d92341f399aa2ac444";
  const StoreId = "6502b1429cf6a84012480e55";

  const [productId, setProductId] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [orderStatus, setOrderStatus] = useState("Open");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the order object with form data
    const newOrder = {
      userID: UserId, // Use the constant UserId
      storeID: StoreId, // Use the constant StoreId
      productID: productId,
      amount: Number(orderAmount), // Ensure it's a number
      status: orderStatus,
    };

    try {
      const response = await fetch("https://order-api-patiparnpa.vercel.app/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to create the order");
      }

      // Order created successfully, you can handle this as needed, e.g., show a success message
      console.log("Order created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating the order:", error);
    }
  };

  return (
    <>
      <div className="store-setting-container">
        <h1>Test Create Order</h1>
        <form className="store-setting-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Id:</label>
            <input type="text" value={UserId} placeholder="User Id" disabled />
          </div>
          <div className="form-group">
            <label>Store Id:</label>
            <input type="text" value={StoreId} placeholder="Store Id" disabled />
          </div>
          <div className="form-group">
            <label>Product Id:</label>
            <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="Enter Product Id" required />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input type="number" value={orderAmount} onChange={(e) => setOrderAmount(e.target.value)} placeholder="Enter the amount" required />
          </div>
          <div className="form-group">
            <label>Order Status</label>
            <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className="form-control">
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <button type="submit">Save Settings</button>
        </form>
      </div>
    </>
  );
};