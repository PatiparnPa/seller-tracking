import { useEffect, useState } from "react";
import { AppBar } from "./AppBar";

interface ReportData {
  totalProducts: number;
  totalOrders: number;
  totalAmount: number;
  top5Products: { name: string; orderCount: number }[];
}

export const ReportPage = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [timeFilter, setTimeFilter] = useState<string>("d"); // Default to daily

  useEffect(() => {
    // Fetch report data from the API when the component mounts or when timeFilter changes
    fetch(
      `https://order-api-patiparnpa.vercel.app/reports/65a39b4ae668f5c8329fac98?timeFilter=${timeFilter}:`
    )
      .then((response) => response.json())
      .then((data: ReportData) => {
        console.log("API Response:", data);
        setReportData(data);
      })
      .catch((error) => {
        console.error("Error fetching report data:", error);
      });
  }, [timeFilter]);

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
      </>
  
  );
};
