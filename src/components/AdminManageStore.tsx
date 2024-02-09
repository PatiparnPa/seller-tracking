import { AppBar } from "./AppBar";
import Sidebar from "./SideBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StatusSwitch from "./StatusSwitch";

export const AdminManageStore = () => {
  const [storeList, setStoreList] = useState([
    { id: "1", name: "Store 1", status: "Open" },
    { id: "2", name: "Store 2", status: "Closed" },
    // Add more static data as needed
  ]);

  async function updateStatusOnServer(storeId: string, newStatus: string) {
    try {
      // Your API call code goes here
      // ...
    } catch (error) {
      console.error("Error updating status on the server:", error);
    }
  }

  useEffect(() => {
    // No need to fetch data as it's static
    // setStoreList([...]); // You can set the initial state here if needed
  }, []);

  return (
    <>
      <div style={{ display: "flex", height: "90vh" }}>
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
                  <tr key={store.id}>
                    <td style={{ borderLeft: "none", paddingLeft: "3%" }}>
                      {store.name}
                    </td>
                    <td>
                      {store.status}
                      <StatusSwitch
                        initialStatus={store.status}
                        onStatusChange={(newStatus) => {
                          updateStatusOnServer(store.id, newStatus);
                          // Update the status in your component's state
                          setStoreList((prevStoreList) => {
                            return prevStoreList.map((item) => {
                              if (item.id === store.id) {
                                return { ...item, status: newStatus };
                              }
                              return item;
                            });
                          });
                        }}
                      />
                    </td>
                    <td>
                      <Link to={'/accessstore'} className="edit-button">
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
