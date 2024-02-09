import { AppBar } from "./AppBar";
import Sidebar from "./SideBar";
import { useState, useEffect } from "react";

export const AdminOption = () => {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <div style={{ display: "flex", height: "90vh" }}>
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
                <label>อีเมล</label>
                <input
                  type="email"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
