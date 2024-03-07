import { AppBar } from "./AppBar";
import Sidebar from "./SideBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StatusSwitch from "./StatusSwitch";

interface Store {
  _id: string;
  name: string;
  store_img_url: string;
  bank_name: string;
  owner_name: string;
  card_num: number;
  qr_img_url: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const AdminManageStore = () => {
  const [storeList, setStoreList] = useState<Store[]>([]);

  async function fetchStoreData() {
    try {
      const response = await fetch(
        "https://order-api-patiparnpa.vercel.app/stores/"
      );
      const data: Store[] = await response.json();
      setStoreList(data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  }

  async function updateStatusOnServer(storeId: string, newStatus: string) {
    try {
      const response = await fetch(
        `https://order-api-patiparnpa.vercel.app/stores/${storeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        console.log(`Status updated successfully for store ${storeId}`);
      } else {
        console.error(`Failed to update status for store ${storeId}`);
      }
    } catch (error) {
      console.error("Error updating status on the server:", error);
    }
  }

  useEffect(() => {
    fetchStoreData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", height: "80vh" }}>
        <Sidebar />
        <div style={{ flex: 1, paddingLeft: "200px", paddingRight: "20px" }}>
          <br />
          <div className="menu-list-container">
            <Link to={"/createstore"} className="add-button">
              เพิ่มร้านค้าใหม่
            </Link>
            <table className="menu-table">
              <thead>
                <tr>
                  <th
                    style={{
                      width: "40%",
                      borderLeft: "none",
                      paddingLeft: "3%",
                    }}
                  >
                    ชื่อร้านค้า
                  </th>
                  <th style={{ width: "30%" }}>สถานะ</th>
                  <th style={{ width: "30%" }}>แอคชั่น</th>
                </tr>
              </thead>
              <tbody>
                {storeList.map((store) => (
                  <tr key={store._id}>
                    <td style={{ borderLeft: "none", paddingLeft: "3%" }}>
                      {store.name}
                    </td>
                    <td>
                      <StatusSwitch
                        initialStatus={store.status}
                        onStatusChange={(newStatus) => {
                          updateStatusOnServer(store._id, newStatus);
                          // Update the status in your component's state
                          setStoreList((prevStoreList) => {
                            return prevStoreList.map((item) => {
                              if (item._id === store._id) {
                                return { ...item, status: newStatus };
                              }
                              return item;
                            });
                          });
                        }}
                      />
                    </td>
                    <td>
                      <Link to={`/accessstore/${store._id}`} className="edit-button">
                        เข้าถึงร้านค้า
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
