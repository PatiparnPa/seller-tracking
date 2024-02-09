import React, { useState, useEffect } from "react";
import { AppBar } from "./AppBar";
import { useParams, useNavigate } from "react-router-dom";

export const EditStore = () => {
  const navigate = useNavigate();

  const [storeId, setStoreId] = useState("");
  const [storeImage, setStoreImage] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeStatus, setStoreStatus] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountImage, setAccountImage] = useState("");
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
        setStoreImage(reader.result as string);
        setError(""); // Clear any previous error message
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const maxSize = 1024 * 1024;

    if (file) {
      if (file.size > maxSize) {
        setError("Image size is too large. Please choose a smaller image.");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setAccountImage(reader.result as string);
        setError(""); // Clear any previous error message
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

  useEffect(() => {
    fetch(
      "https://order-api-patiparnpa.vercel.app/stores/65a39b4ae668f5c8329fac98"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setStoreId(data._id);
        setStoreName(data.name);
        setStoreStatus(data.status);
        setBankName(data.bank_name);
        setAccountName(data.owner_name);
        setAccountNumber(data.card_num);
        setStoreImage(data.store_img_url);
        setAccountImage(data.qr_img_url);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updateStore = {
      name: storeName,
      status: storeStatus,
      store_img_url: storeImage,
      bank_name: bankName,
      owner_name: accountName,
      card_num: accountNumber,
      qr_img_url: accountImage,
    };

    fetch(
      "https://order-api-patiparnpa.vercel.app/stores/65a39b4ae668f5c8329fac98",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateStore),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update store data");
        }
        console.log("Store data updated successfully");
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating store data:", error);
        setError("Failed to update store data. Please try again.");
      });
  };

  return (
      <>
        <br></br>
        <div className="store-setting-container">
          <h5 style={{ color: "#002336" }}>ตั้งค่าร้านค้า</h5>
          <br />
          {/* Display error message */}
          {error && <p className="error-message">{error}</p>}
          <form className="store-setting-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>รูปภาพร้านค้า</label>
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
              />
            </div>

            <div className="form-group">
              <label>ชื่อร้านค้า</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="ใส่ชื่อร้าน"
                required
              />
            </div>
            <br />
            <h5 style={{ color: "#002336" }}>ตั้งค่าการรับเงิน</h5>
            <br />
            <div className="form-group">
              <label>ชื่อธนาคาร</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="ใส่ชื่อธนาคาร"
                required
              />
            </div>

            <div className="form-group">
              <label>ชื่อในบัญชี</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="ใส่ชื่อในบัญชี"
                required
              />
            </div>

            <div className="form-group">
              <label>หมายเลขบัญชี</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="ใส่หมายเลขบัญชี"
                required
              />
            </div>
            <div className="form-group">
              <label>QR code</label>
              <div
                className="image-container"
                style={{ cursor: "pointer" }}
                onClick={handleImageContainerClick}
              >
                {accountImage ? (
                  <img
                    src={accountImage}
                    alt="Url Image"
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
                onChange={handleImageUpload2}
                style={{ display: "none" }}
              />
            </div>

            <button type="submit">บันทึก</button>
          </form>
        </div>
      </>
  );
};
