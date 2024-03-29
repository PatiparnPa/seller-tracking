import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "./AppBar";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";

export const CreateMenu = () => {
  const navigate = useNavigate();
  const {storeId} = useUser()
  const [menuImage, setMenuImage] = useState<string>("");
  const [menuName, setMenuName] = useState<string>("");
  const [menuPrice, setMenuPrice] = useState<string>("");
  const [menuStatus, setMenuStatus] = useState<string>("Open");
  const [error, setError] = useState<string>("");

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
        setMenuImage(imageUrl);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMenuItem = {
      name: menuName,
      price: parseFloat(menuPrice),
      status: menuStatus,
      product_img_url: menuImage,
      product_tag: "normal",
      store_id: storeId,
      product_type:'normal'
    };

    fetch("https://order-api-patiparnpa.vercel.app/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create menu item");
        }
        setMenuName("");
        setMenuPrice("");
        setMenuStatus("Open");
        setMenuImage("");
        navigate("/menulist");
      })
      .catch((error) => {
        console.error("Error creating menu item:", error);
        setError("Failed to create menu item. Please try again.");
      });
  };

  return (
    <>
      <div className="store-setting-container">
        <h5>เพิ่มเมนูอาหาร</h5>
        <br />
        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="store-setting-form">
          <div className="form-group">
            <label>รูปภาพอาหาร</label>
            <div
              className="image-container"
              style={{ cursor: "pointer" }}
              onClick={handleImageContainerClick}
            >
              {menuImage ? (
                <img
                  src={menuImage}
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
            <label>ชื่ออาหาร</label>
            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>ราคา</label>
            <input
              type="number"
              value={menuPrice}
              onChange={(e) => setMenuPrice(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>สถานะ</label>
            <select
              value={menuStatus}
              onChange={(e) => setMenuStatus(e.target.value)}
              className="form-control"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <br />
          <br />
          <button type="submit" className="submit-button">
            สร้าง
          </button>
        </form>
      </div>
    </>
  );
};
