import { useState, useEffect } from "react";
import { AppBar } from "./AppBar";
import { useNavigate } from "react-router-dom";
import { AccessSideBar } from "./AccessStoreSideBar";
import { SideBar2 } from "./SideBar2";

export const CreateStore = () => {
  const navigate = useNavigate();
  const [storeImage, setStoreImage] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeStatus, setStoreStatus] = useState<string>("open");
  const [storeUsername, setStoreUsername] = useState("");
  const [storePassword, setStorePassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    const maxSize = 1024 * 1024;

    if (file) {
      if (file.size > maxSize) {
        setError("Image size is too large. Please choose a smaller image.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("img", file);

        const response = await fetch(
          "https://upload2firebase.vercel.app/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        const imageUrl = await response.text();
        setStoreImage(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Failed to upload image. Please try again.");
      }
    }
  };

  const handleImageContainerClick = () => {
    const fileInput = document.getElementById(
      "imageUpload"
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.click();
    }
  };

  const createNewStore = async () => {
    try {
      // Create store
      const storeResponse = await fetch(
        "https://order-api-patiparnpa.vercel.app/stores/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: storeName,
            store_img_url: storeImage,
            status: storeStatus,
          }),
        }
      );

      if (!storeResponse.ok) {
        throw new Error("Failed to create new store");
      }

      // Get the store ID from the response
      const storeData = await storeResponse.json();
      const storeId = storeData._id;

      // Create account for the store
      const accountResponse = await fetch(
        "https://order-api-patiparnpa-patiparnpas-projects.vercel.app/authos/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            storeid: storeId,
            username: storeUsername,
            password: storePassword,
            usertype: "seller",
          }),
        }
      );

      if (!accountResponse.ok) {
        throw new Error("Failed to create account for the store");
      }

      // Reset form fields after successful creation
      setStoreImage("");
      setStoreName("");
      setStoreStatus("Open");
      setStoreUsername("");
      setStorePassword("");
      navigate("/adminstore");
    } catch (error) {
      console.error("Error creating new store and account:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createNewStore();
  };

  return (
    <>
      <div style={{ display: "flex", height: "80vh" }}>
        <SideBar2></SideBar2>
        <div style={{ flex: 1, paddingLeft: "200px", paddingRight: "20px" }}>
          <div className="store-setting-container">
            <h5>เพื่มร้านค้าใหม่</h5>
            <br />
            <form onSubmit={handleSubmit} className="store-setting-form">
              <div className="form-group">
                <label>รูปภาพอาหาร</label>
                <div
                  className="image-container"
                  style={{ cursor: "pointer" }}
                  onClick={handleImageContainerClick}
                >
                  {storeImage ? (
                    <img
                      src={storeImage}
                      alt="Store Image"
                      className="store-image"
                    />
                  ) : (
                    <p></p>
                  )}
                </div>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  required
                />
              </div>
              <div className="form-group">
                <label>ชื่อร้านค้า</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="form-control"
                  required
                  style={{ border: "2px solid #ddd" }}
                />
              </div>
              <div className="form-group">
                <label>สถานะ</label>
                <select
                  value={storeStatus}
                  onChange={(e) => setStoreStatus(e.target.value)}
                  className="form-control"
                >
                  <option value="open">Open</option>
                  <option value="close">Closed</option>
                </select>
              </div>
              <div className="form-group">
                <label>เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  value={storeUsername}
                  onChange={(e) => setStoreUsername(e.target.value)}
                  className="form-control"
                  required
                  style={{ border: "2px solid #ddd" }}
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
                  style={{ border: "2px solid #ddd" }}
                />
              </div>
              <br />
              <button type="submit" className="submit-button">
                สร้างร้านค้า
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
