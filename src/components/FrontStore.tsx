import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

interface Order {
  _id: string;
  productIDs: {
    productId: string;
    quantity: number;
    orderDetail?: string;
    _id: string;
  }[];
  userID: string;
  storeID: string;
  amount: number;
  status: string;
  payment_method_status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  foodDetails: {
    foodName: string;
    quantity: number;
  }[];
  queueNumber?: string;
}

export const FrontStore = () => {
  const [foodOrders, setFoodOrders] = useState<Order[]>([]);
  const [checkedOrders, setCheckedOrders] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const handleCheckboxChange = (orderId: string) => {
    const isChecked = checkedOrders.includes(orderId);
    if (isChecked) {
      setCheckedOrders(checkedOrders.filter((id) => id !== orderId));
    } else {
      setCheckedOrders([...checkedOrders, orderId]);
    }
  };

  const handleCancelOrders = async () => {
    try {
      await Promise.all(
        checkedOrders.map(async (orderId) => {
          const response = await fetch(
            `https://order-api-patiparnpa.vercel.app/orders/${orderId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "cancel" }),
            }
          );
          if (!response.ok) {
            throw new Error(`Failed to cancel order ${orderId}`);
          }
        })
      );

      // Update UI to reflect the cancelled orders
      const updatedOrders = foodOrders.map((order) => {
        if (checkedOrders.includes(order._id)) {
          return {
            ...order,
            status: "cancel",
          };
        }
        return order;
      });
      setFoodOrders(updatedOrders);
      setCheckedOrders([]);
      console.log("Orders cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling orders:", error);
    }
  };


  useEffect(() => {
    const fetchFoodOrders = async () => {
      try {
        const response = await fetch(
          "https://order-api-patiparnpa.vercel.app/orders/store/65a39b4ae668f5c8329fac98"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const orders = await response.json();

        // Fetch queue number for each order
        const updatedOrders = await Promise.all(
          orders.map(async (order: Order) => {
            const queueResponse = await fetch(
              `https://order-api-patiparnpa.vercel.app/queues/order/${order._id}`
            );
            if (!queueResponse.ok) {
              throw new Error("Failed to fetch queue number");
            }
            const queueData = await queueResponse.json();
            const queueNumber = queueData[0]?.queueNumber || "N/A";

            return {
              ...order,
              queueNumber: queueNumber,
            };
          })
        );

        // Now updatedOrders contains the queue number for each order
        // Continue with your existing logic to fetch product details and update state

        // Create an array to store the additional food details
        const foodDetailsPromises = updatedOrders.map(async (order: Order) => {
          // Fetch the product details for each food item
          const productDetailsPromises = order.productIDs.map(
            async (product) => {
              const productResponse = await fetch(
                `https://order-api-patiparnpa.vercel.app/products/${product.productId}`
              );
              if (!productResponse.ok) {
                throw new Error("Failed to fetch product details");
              }
              const productData = await productResponse.json();

              // Return the food details for each product
              return {
                foodName: productData.name,
                quantity: product.quantity,
              };
            }
          );

          // Wait for all product details requests to complete
          const foodDetails = await Promise.all(productDetailsPromises);

          // Combine the order and product details
          return {
            ...order,
            foodDetails,
          };
        });

        // Wait for all food details requests to complete
        const updatedFoodOrders = await Promise.all(foodDetailsPromises);

        // Reverse the order of the array
        setFoodOrders(updatedFoodOrders.reverse());
        console.log("Data reload successful!");
      } catch (error) {
        console.error("Error fetching food orders:", error);
      }
    };
    // Fetch data initially
    fetchFoodOrders();

    // Set up interval to fetch data every 15 seconds
    const intervalId = setInterval(() => {
      fetchFoodOrders();
    }, 300000000000000000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
      console.log("Interval cleared");
    };
  }, []); // Empty dependency array to run effect only once on mount

  

  return (
    <>
      <div className="app-bar">
        <div className="title">
          <h5 style={{ color: "#FFFFFF" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#FFFFFF" }}>
              IT Cafeteria
            </Link>{" "}
            |{" "}
            <Link
              to="/front"
              style={{ color: "#FFFFFF", textDecoration: "none" }}
            >
              หน้าร้าน
            </Link>{" "}
            |{" "}
            <Link
              to="/back"
              style={{ color: "#FFFFFF", textDecoration: "none" }}
            >
              หลังร้าน
            </Link>
          </h5>
        </div>
        <div className="right-element">
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "#FF3A3A",
              borderRadius: "5px",
              paddingTop: "7px",
              paddingRight: "65px",
              paddingBottom: "7px",
              paddingLeft: "65px",
            }}
          >
            ปิดร้าน
          </button>
        </div>
      </div>
      <div className="back-store-page">
        <table className="food-order-table">
          <thead>
            <tr>
              <th style={{ width: "70px" }}></th>
              <th style={{ width: "80px" }}>คิวที่</th>
              <th style={{ width: "200px", textAlign: "left" }}>ชื่อเมนู</th>
              <th style={{ width: "85px" }}>จำนวน</th>
              <th style={{ width: "85px" }}>ราคา(บาท)</th>
              <th style={{ width: "115px" }}>สถานะ</th>
              <th style={{ width: "115px" }}>การชำระเงิน</th>
            </tr>
          </thead>
          <tbody style={{ maxHeight: "80vh", overflowY: "auto" }}>
            {foodOrders.map((order, index) => (
              <tr key={index}>
                <td style={{ width: "60px" }}>
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={checkedOrders.includes(order._id)}
                    onChange={() => handleCheckboxChange(order._id)}
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </td>
                <td>
                  <b>{order.queueNumber}</b>
                </td>
                <td style={{ textAlign: "left" }}>
                  {order.foodDetails.map((food, i) => (
                    <div key={i}>
                      <p style={{ paddingBottom: "-5px" }}>{food.foodName}</p>
                      <p className="back-food-details">
                        {order.productIDs[i]?.orderDetail || "ไม่มี"}
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  {order.foodDetails.map((food, i) => (
                    <div key={i} style={{ marginBottom: "-5px" }}>
                      <p style={{ padding: "15px" }}>{food.quantity} จาน</p>
                    </div>
                  ))}
                </td>

                <td
                  className={
                    order.foodDetails.some(
                      (food) => food.foodName === "เมนูตามสั่ง"
                    )
                      ? "red-price"
                      : ""
                  }
                >
                  {order.amount} บาท
                </td>
                <td>{order.status}</td>
                <td>{order.payment_method_status}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th style={{ textAlign: "right" }}>
                <button
                  onClick={handleCancelOrders}
                  style={{
                    backgroundColor: "#FF3A3A",
                    borderRadius: "7px",
                    paddingTop: "3px",
                    paddingRight: "60px",
                    paddingBottom: "3px",
                    paddingLeft: "60px",
                    marginRight: "5%",
                  }}
                >
                  ปฎิเสธ
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
