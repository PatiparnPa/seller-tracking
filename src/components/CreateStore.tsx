import { useState, useEffect } from "react";
import { AppBar } from "./AppBar";

export const CreateStore = () => {
    const [storeImage, setStoreImage] = useState('')
    const [storeName, setStoreName] = useState('')
    const [storeEmail, setStoreEmail] = useState('')
    const [storePassword, setStorePassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
      };
    return (
        <>
        <div className="store-setting-container">
            <h5>เพื่มร้านค้าใหม่</h5>
            <br />
            <form onSubmit={handleSubmit} className="store-setting-form">
            <div className="form-group">
            <label>รูปภาพอาหาร</label>
            <div className="image-container">
              {storeImage ? (
                <img
                  src={storeImage}
                  alt="Store Image"
                  className="store-image"
                />
              ) : null}
            </div>
          </div>  
              <div className="form-group">
                <label>ชื่อร้านค้า</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="form-control"
                  required
                  style={{border:'2px solid #ddd'}}
                />
              </div>
              <div className="form-group">
                <label>อีเมล/เบอร์</label>
                <input
                  type="text"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  className="form-control"
                  required
                  style={{border:'2px solid #ddd'}}
                />
              </div>
              <div className="form-group">
                <label>รหัสผ่าน</label>
                <input
                  type="text"
                  value={storePassword}
                  onChange={(e) => setStorePassword(e.target.value)}
                  className="form-control"
                  required
                  style={{border:'2px solid #ddd'}}
                />
              </div>
              <div className="form-group">
                <label>ยืนยันรหัสผ่าน</label>
                <input
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                  required
                  style={{border:'2px solid #ddd'}}
                />
              </div>
              <br />
              <button type="submit" className="submit-button">
                สร้างร้านค้า
              </button>
            </form>
          </div>
        </>
    )
}