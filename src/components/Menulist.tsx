import { Link } from "react-router-dom";
import { AppBar } from "./AppBar";
import { useState, useEffect } from "react";
import StatusSwitch from "./StatusSwitch";

interface MenuItem {
  _id: string;
  name: string;
  product_img_url: string;
  product_tag: string;
  price: number;
  store_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const Menulist = () => {
  const storeId = '65a39b4ae668f5c8329fac98';
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  async function updateStatusOnServer(menuId: string, newStatus: string) {
    try {
      // Send a PUT request to update the status on the server
      const response = await fetch(
        `https://order-api-patiparnpa.vercel.app/products/${menuId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update menu item status");
      }
    } catch (error) {
      console.error("Error updating status on the server:", error);
    }
  }

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          "https://order-api-patiparnpa.vercel.app/products/store/65a39b4ae668f5c8329fac98"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <>
      <br></br>
      <div className="menu-list-container">
        <Link to={"/createmenu"} className="add-button">
          เพื่มเมนูใหม่
        </Link>

        <table className="menu-table">
          <thead>
            <tr>
              <th style={{width:'15%'}}></th>
              <th style={{width:'30%'}}>ชื่อเมนู</th>
              <th style={{width:'15%'}}>ราคา(บาท)</th>
              <th style={{width:'15%'}}>สถานะ</th>
              <th style={{width:'15%'}}>แอคชั่น</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((menu) => (
              <tr key={menu._id}>
                <td style={{textAlign:'center'}}>
                  <img
                    src={menu.product_img_url}
                    alt='menu img'
                    className="menu-image"
                  />
                </td>
                <td style={{fontWeight:'bold'}}>{menu.name}</td>
                <td style={{fontWeight:'bold'}}>{menu.price}</td>
                <td><StatusSwitch
                    initialStatus={menu.status}
                    onStatusChange={(newStatus) => {
                      updateStatusOnServer(menu._id, newStatus);

                      // Update the status in your component's state
                      setMenuItems((prevMenuItems) => {
                        return prevMenuItems.map((item) => {
                          if (item._id === menu._id) {
                            return { ...item, status: newStatus };
                          }
                          return item;
                        });
                      });
                    }}
                  /></td>
                <td>
                  <Link to={`/editmenu/${menu._id}`} className="edit-button">
                    แก้ไข
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
