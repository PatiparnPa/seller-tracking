import { useState } from "react";

interface Order {
  orderName: string;
  quantity: number;
  paymentOption: string;
}

export const IncomingOrder = () => {
  const [incomingOrders, setIncomingOrders] = useState<Order[]>([
    { orderName: "กระเพราหมู", quantity: 2, paymentOption: "จ่ายผ่านแอป" },
    { orderName: "ข้าวผัดไก่", quantity: 3, paymentOption: "จ่ายผ่านแอป" },
    { orderName: "ต้มยำกุ้ง", quantity: 1, paymentOption: "จ่ายหน้าร้าน" },
    { orderName: "ต้มยำกุ้ง", quantity: 1, paymentOption: "จ่ายหน้าร้าน" },
    { orderName: "ต้มยำกุ้ง", quantity: 1, paymentOption: "จ่ายหน้าร้าน" },
    { orderName: "ต้มยำกุ้ง", quantity: 1, paymentOption: "จ่ายหน้าร้าน" },
  ]);

  const totalIncomingOrders = incomingOrders.length;

  return (
    <div
      className={`incoming-order-container ${
        totalIncomingOrders === 0 ? "empty" : ""
      }`}
    >
      <h2 className="incoming-order-title">
        ออเดอร์ที่รอรับ(
        <span style={{ color: "red" }}>{totalIncomingOrders}</span>)
      </h2>
      <div className="incoming-order-list">
        {incomingOrders.map((order, index) => (
          <div
            className={`incoming-order-item ${
              index === 0 ? "first-order" : ""
            }`}
            key={index}
          >
            <div className="incoming-menu-details">
              <p className="incoming-order-name">{order.orderName}</p>
              <p className="incoming-order-price">{order.quantity} จาน</p>
            </div>
            <p className="incoming-payment-status">{order.paymentOption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
