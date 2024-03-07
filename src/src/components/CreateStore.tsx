import { useState, useEffect } from "react";
import { AppBar } from "./AppBar";
import { useNavigate } from "react-router-dom";

export const CreateStore = () => {
  const navigate = useNavigate();
  const [storeImage, setStoreImage] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeStatus, setStoreStatus] = useState<string>("open");
  const [error, setError] = useState<string>("");
  

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const maxSize = 1024 * 1024;

    if (file) {
      if (file.size > maxSize) {
        setError("Image size is too large. Please choose a smaller image.");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setError("");
        const imageUrl = reader.result as string;
        setStoreImage(imageUrl);
      };

      reader.readAsDataURL(file);
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
      const response = await fetch("https://order-api-patiparnpa.vercel.app/stores/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: storeName,
          store_img_url: storeImage,
          status: storeStatus,
        }),
      });

      if (response.ok) {
        // Store created successfully
        console.log("New store created successfully");
        // Reset form fields after successful creation
        setStoreImage("");
        setStoreName("");
        setStoreStatus("Open");
        navigate("/adminstore");
      } else {
        console.error("Failed to create new store");
      }
    } catch (error) {
      console.error("Error creating new store:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createNewStore();
  };
  return (
    <>
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
            <select value={storeStatus} onChange={(e) => setStoreStatus(e.target.value)} className="form-control">
              <option value="open">Open</option>
              <option value="close">Closed</option>
            </select>
          </div>
          <br />
          <button type="submit" className="submit-button">
            สร้างร้านค้า
          </button>
        </form>
      </div>
    </>
  );
};
