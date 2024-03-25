import React, { useState, useEffect } from "react";
import { AppBar } from "./AppBar";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

export const EditStore = () => {
  const navigate = useNavigate();
  const { storeId } = useUser();
  const [storeImage, setStoreImage] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeStatus, setStoreStatus] = useState<string>("open");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountImage, setAccountImage] = useState("");
  const [error, setError] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState("");

  const bankCodes: { [key: string]: string } = {
    "002": "กรุงเทพ",
    "004": "กสิกรไทย",
    "006": "กรุงไทย",
    "011": "ทหารไทยธนชาต",
    "014": "ไทยพาณิชย์",
    "025": "กรุงศรีอยุธยา",
    "069": "เกียรตินาคินภัทร",
    "022": "ซีไอเอ็มบีไทย",
    "067": "ทิสโก้",
    "024": "ยูโอบี",
    "071": "ไทยเครดิตเพื่อรายย่อย",
    "073": "แลนด์ แอนด์ เฮ้าส์",
    "070": "ไอซีบีซี (ไทย)",
    "098": "พัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย",
    "034": "เพื่อการเกษตรและสหกรณ์การเกษตร",
    "035": "เพื่อการส่งออกและนำเข้าแห่งประเทศไทย",
    "030": "ออมสิน",
    "033": "อาคารสงเคราะห์",
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

        const response = await fetch("https://upload2firebase.vercel.app/upload", {
          method: "POST",
          body: formData,
        });

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

  const handleQRCodeImageUpload = async (
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
  
        const response = await fetch("https://upload2firebase.vercel.app/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`Failed to upload image: ${response.statusText}`);
        }
  
        const imageUrl = await response.text();
        setAccountImage(imageUrl);
        setError(""); // Clear any previous error message
      } catch (error) {
        console.error("Error uploading QR code image:", error);
        setError("Failed to upload QR code image. Please try again.");
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

  const handleImageContainerClick2 = () => {
    const fileInput = document.getElementById(
      "qrCodeImageUpload"
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.click();
    }
  };

  useEffect(() => {
    fetch(`https://order-api-patiparnpa.vercel.app/stores/${storeId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setStoreName(data.name);
        setStoreStatus(data.status);
        setSelectedBank(data.bank_name);
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
      bank_name: selectedBank, 
      owner_name: accountName,
      card_num: accountNumber,
      qr_img_url: accountImage,
    };

    fetch(`https://order-api-patiparnpa.vercel.app/stores/${storeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateStore),
    })
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

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBankName(bankCodes[event.target.value]);
    setSelectedBank(event.target.value);
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
          <br />
          <h5 style={{ color: "#002336" }}>ตั้งค่าการรับเงิน</h5>
          <br />
          <div className="form-group">
            <label>ชื่อธนาคาร</label>
            <select
              value={selectedBank}
              onChange={handleBankChange}
              required
              className="form-control"
            >
              <option value="">{selectedBank} </option>
              {Object.keys(bankCodes).map((code) => (
                <option key={code} value={code}>
                  {bankCodes[code]}
                </option>
              ))}
            </select>
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
              onClick={handleImageContainerClick2}
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
              id="qrCodeImageUpload"
              accept="image/*"
              onChange={handleQRCodeImageUpload}
              style={{ display: "none" }}
            />
          </div>

          <button type="submit">บันทึก</button>
        </form>
      </div>
    </>
  );
};
