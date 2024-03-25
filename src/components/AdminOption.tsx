import { AppBar } from "./AppBar";
import Sidebar from "./SideBar";
import { useState, useEffect } from "react";
import { useUser } from "./UserContext";

export const AdminOption = () => {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const {storeId} = useUser()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Fetch the _id for the admin
      const idResponse = await fetch(
        `https://order-api-patiparnpa-patiparnpas-projects.vercel.app/authos/check/${storeId}`
      );
      if (!idResponse.ok) {
        throw new Error("Failed to fetch admin _id");
      }
      const { _id } = await idResponse.json();

      // Update admin's name
      const nameResponse = await fetch(
        `https://order-api-patiparnpa.vercel.app/stores/${storeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: adminName,
          }),
        }
      );
      if (!nameResponse.ok) {
        throw new Error("Failed to update admin name");
      }

      // Update admin's username/password using the obtained _id
      const usernamePasswordResponse = await fetch(
        `https://order-api-patiparnpa-patiparnpas-projects.vercel.app/authos/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: adminEmail,
            password: adminPassword,
          }),
        }
      );
      if (!usernamePasswordResponse.ok) {
        throw new Error("Failed to update admin username/password");
      }

      // Both updates were successful
      console.log("Admin details updated successfully!");
    } catch (error) {
      console.error("Error updating admin details:", error);
      setError("Failed to update admin details");
    }
  };


  return (
    <>
      <div style={{ display: "flex", height: "80vh" }}>
        <Sidebar />
        <div style={{ flex: 1, paddingLeft: "200px", paddingRight: "20px" }}>
          <div className="store-setting-container">
            <h5>ตั้งค่าแอดมิน</h5>
            <br />
            <form onSubmit={handleSubmit} className="store-setting-form">
              <div className="form-group">
                <label>ชื่อแอดมิน</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="form-control"
                  required
                  style={{border:'2px solid #ddd'}}
                />
              </div>
              <div className="form-group">
                <label>เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="form-control"
                  required
                  style={{border:'2px solid #ddd'}}
                />
              </div>
              <div className="form-group">
                <label>รหัสผ่าน</label>
                <input
                  type="text"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="form-control"
                  required
                  style={{border:'2px solid #ddd'}}
                />
              </div>
              <br />
              <button type="submit" className="submit-button">
                บันทึก
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
