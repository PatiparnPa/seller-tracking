import React, { useEffect, useState } from "react";
import { AppBar } from "./AppBar";
import { useUser } from "./UserContext";

interface ReportData {
  totalProducts?: number; // Make these properties optional
  totalOrders?: number;
  totalAmount?: number;
  top5Products?: Product[];
}

interface Product {
  name: string;
  orderCount: number;
  namee: string;
}

export const ReportPage = () => {
  const { storeId } = useUser();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [timeFilter, setTimeFilter] = useState<string>("d"); // Default to daily

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://order-api-patiparnpa.vercel.app/reports/${storeId}?timeFilter=${timeFilter}`
        );
        const data: ReportData = await response.json();
        console.log("API Response:", data);
        setReportData(data);
        
        if (data && data.top5Products && data.top5Products.length > 0) {
          fetchProductNames(data.top5Products);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
  
    fetchData();
  }, [storeId, timeFilter]);
  
  const fetchProductNames = async (products: Product[]) => {
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const productInfoResponse = await fetch(
          `https://order-api-patiparnpa.vercel.app/products/${product.name}`
        );
        const productInfo = await productInfoResponse.json();
        return {
          ...product,
          namee: productInfo.name,
        };
      })
    );
    setReportData((prevData) => ({
      ...prevData,
      top5Products: updatedProducts,
    }));
  };
  

  return (
    <>
      <div className="report-options">
        <button
          className={`report-button ${timeFilter === "d" ? "active" : ""}`}
          onClick={() => setTimeFilter("d")}
        >
          รายวัน
        </button>
        <button
          className={`report-button ${timeFilter === "w" ? "active" : ""}`}
          onClick={() => setTimeFilter("w")}
        >
          รายสัปดาห์
        </button>
        <button
          className={`report-button ${timeFilter === "m" ? "active" : ""}`}
          onClick={() => setTimeFilter("m")}
        >
          รายเดือน
        </button>
        <button
          className={`report-button ${timeFilter === "y" ? "active" : ""}`}
          onClick={() => setTimeFilter("y")}
        >
          รายปี
        </button>
        <button
          className={`report-button ${timeFilter === "" ? "active" : ""}`}
          onClick={() => setTimeFilter("")}
        >
          ทั้งหมด
        </button>
      </div>
      <div className="report-content-row">
        {reportData ? (
          <>
            <div className="report-content">
              <h4>เมนูทั้งหมด</h4>
              <h1>{reportData.totalProducts}</h1>
            </div>
            <div className="report-content">
              <h4>จำนวนออเดอร์</h4>
              <h1>{reportData.totalOrders}</h1>
            </div>
            <div className="report-content">
              <h4>ยอดเงินที่ได้รับ</h4>
              <h1>{reportData.totalAmount}</h1>
            </div>
          </>
        ) : (
          // Display 0 for each metric when reportData is null
          <>
            <div className="report-content">
              <h4>เมนูทั้งหมด</h4>
              <h1>0</h1>
            </div>
            <div className="report-content">
              <h4>จำนวนออเดอร์</h4>
              <h1>0</h1>
            </div>
            <div className="report-content">
              <h4>ยอดเงินที่ได้รับ</h4>
              <h1>0</h1>
            </div>
          </>
        )}
      </div>
      {reportData &&
        reportData.top5Products &&
        reportData.top5Products.length > 0 && (
          <div className="report-content-container">
            <div style={{ marginLeft: "30px", marginRight: "30px" }}>
              <h5>อันดับเมนูขายดี</h5>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "#f2f2f2",
                      }}
                    >
                      Product Name
                    </th>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "#f2f2f2",
                      }}
                    >
                      Order Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.top5Products.map((product, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          border: "1px solid #dddddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {product.namee}
                      </td>
                      <td
                        style={{
                          border: "1px solid #dddddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {product.orderCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      <br></br>
    </>
  );
};
