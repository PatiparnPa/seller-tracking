import { useState, useEffect } from "react";

interface CurrentOrderProps {
  selectedOrder: number | null;
  onOrderClick: (index: number | null) => void;
}

interface OrderData {
  _id: string;
  productID: string;
  userID: string;
  storeID: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MenuData {
  _id: string;
  name: string;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const CurrentOrder: React.FC<CurrentOrderProps> = ({
  selectedOrder,
  onOrderClick,
}) => {
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch order details
  const fetchOrderDetails = () => {
    // Fetch order data from the API
    fetch("https://order-api-patiparnpa.vercel.app/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(async (orderData: OrderData[]) => {
        const orderDetailsPromises = orderData.map(async (order) => {
          // For each order, fetch the corresponding menu data from the API
          const menuResponse = await fetch(
            `https://order-api-patiparnpa.vercel.app/products/${order.productID}`
          );
          if (!menuResponse.ok) {
            throw new Error("Failed to fetch menu details");
          }
          const menuData: MenuData = await menuResponse.json();

          // Combine order data and menu data
          return {
            orderQueue: orderData.indexOf(order) + 1,
            menuName: menuData.name,
            menuQuantity: order.amount,
            menuPrice: menuData.price * order.amount,
            paymentStatus: order.status,
          };
        });

        // Wait for all order details requests to complete
        const details = await Promise.all(orderDetailsPromises);

        setOrderDetails(details);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch order details initially
    fetchOrderDetails();

    // Fetch order details every 30 seconds
    const intervalId = setInterval(() => {
      fetchOrderDetails();
      console.log("API Call: Fetching order details...");
    }, 30000);

    return () => {
      // Cleanup: Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="current-order-container">
      <h2 className="current-order-title">ออเดอร์ที่กำลังทำ</h2>
      <div className="current-order-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          orderDetails.map((order, index) => (
            <div
              className={`current-order-item ${
                order.paymentStatus === "Open"
                  ? "green-border"
                  : "yellow-border"
              } ${index === selectedOrder ? "selected" : ""}`}
              key={index}
              onClick={() =>
                onOrderClick(index === selectedOrder ? null : index)
              }
            >
              <h2 className="current-order-queue">{order.orderQueue}</h2>
              <div className="current-menu-details">
                <p className="current-menu-name">{order.menuName}</p>
                <p className="current-menu-quantity">
                  {order.menuQuantity} จาน
                </p>
              </div>
              <div className="current-menu-details">
                <p
                  className={`current-payment-status ${
                    order.paymentStatus === "Open" ? "green" : "red"
                  }`}
                >
                  {order.paymentStatus === "Open"
                    ? "Open"
                    : "Closed"}
                </p>
                <p className="current-menu-price">{order.menuPrice} บาท</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};