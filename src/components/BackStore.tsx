import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
}

interface Order {
  _id: string;
  productIDs: {
    productId: string;
    quantity: number;
    orderDetail?: string; // Make orderDetail optional
    _id: string;
  }[];
  userID: string;
  storeID: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  foodDetails?: {
    productId: string;
    quantity: number;
    _id: string;
    productName: string;
  }[];
}

export const BackStore = () => {
  const [foodOrders, setFoodOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkedOrders, setCheckedOrders] = useState<string[]>([]);

  const handleCheckboxChange = (orderId: string) => {
    const isChecked = checkedOrders.includes(orderId);
    if (isChecked) {
      setCheckedOrders(checkedOrders.filter((id) => id !== orderId));
    } else {
      setCheckedOrders([...checkedOrders, orderId]);
    }
  };

  const handleFinishButtonClick = async () => {
    try {
      // Update status of checked orders to "ready"
      const updatedOrders = await Promise.all(
        foodOrders.map(async (order) => {
          if (checkedOrders.includes(order._id)) {
            const response = await fetch(
              `https://order-api-patiparnpa.vercel.app/orders/${order._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "ready" }),
              }
            );
            if (!response.ok) {
              throw new Error(`Failed to update order ${order._id}`);
            }
            return { ...order, status: "ready" };
          }
          return order;
        })
      );

      // Remove checked orders from the list
      setFoodOrders(updatedOrders.filter((order) => !checkedOrders.includes(order._id)));
      setCheckedOrders([]);
    } catch (error) {
      console.error("Error updating orders:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch food orders from the API
        const response = await fetch(
          "https://order-api-patiparnpa.vercel.app/orders/store/65a39b4ae668f5c8329fac98/open"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Create an array to store the additional food details
        const foodDetailsPromises = data.map(async (order: Order) => {
          // Fetch the product details for each food item
          const productDetailsPromises = order.productIDs.map(
            async (product) => {
              const productResponse = await fetch(
                `https://order-api-patiparnpa.vercel.app/products/${product.productId}`
              );
              if (!productResponse.ok) {
                throw new Error("Failed to fetch product details");
              }
              const productData: Product = await productResponse.json();

              return {
                ...product,
                productName: productData.name, // Use the product name as the food name
              };
            }
          );

          // Wait for all product details requests to complete
          const productDetails = await Promise.all(productDetailsPromises);

          // Combine the order and product data
          return {
            ...order,
            foodDetails: productDetails,
          };
        });

        // Wait for all food details requests to complete
        const foodDetails = await Promise.all(foodDetailsPromises);

        setFoodOrders(foodDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food orders:", error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval to fetch data every 15 seconds
    const intervalId = setInterval(fetchData, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
      </div>
      <div className="back-store-page">
        <table className="food-order-table">
          <thead>
            <tr>
              <th style={{ width: "100px" }}></th>
              <th style={{ textAlign: "left" }}>ชื่อเมนู</th>
              <th>จำนวน</th>
            </tr>
          </thead>
          <tbody style={{ maxHeight: "80vh", overflowY: "auto" }}>
            {foodOrders.map((order, index) => (
              <tr key={index}>
                <td style={{ width: "100px" }}>
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
                <td style={{ textAlign: "left" }}>
                  {order.foodDetails?.map((food, i) => (
                    <div key={i}>
                      <p>{food.productName}</p>
                      <p className="back-food-details">
                        {order.productIDs[i]?.orderDetail || "ไม่มี"}
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  {order.foodDetails?.map((food, i) => (
                    <div key={i} style={{ marginBottom: "-5px" }}>
                      <p style={{ padding: "15px" }}>{food.quantity} จาน</p>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th style={{ textAlign: "right", paddingRight: "20px" }}>
                <button className="finish-button" onClick={handleFinishButtonClick}>เสร็จสิ้น</button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
