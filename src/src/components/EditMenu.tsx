import React, { useState, useEffect } from "react";
import { AppBar } from "./AppBar";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const EditMenu = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuStatus, setMenuStatus] = useState("");
  const [menuImage, setMenuImage] = useState("");
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
        setMenuImage(imageUrl);
        console.log("Image URL:", imageUrl);
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
    fetch(`https://order-api-patiparnpa.vercel.app/products/${_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setMenuName(data.name);
        setMenuPrice(data.price);
        setMenuStatus(data.status);
        setMenuImage(data.product_img_url);
      })
      .catch((error) => {
        console.error("Error fetching menu details:", error);
      });
  }, [_id]);

  const handleDelete = () => {
    fetch(`https://order-api-patiparnpa.vercel.app/products/${_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete menu item");
        }
        navigate("/menulist");
      })
      .catch((error) => {
        console.error("Error deleting menu item:", error);
        setError("Failed to delete menu item. Please try again.");
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedMenuItem = {
      name: menuName,
      price: parseFloat(menuPrice),
      status: menuStatus,
      product_img_url: menuImage,
    };

    fetch(`https://order-api-patiparnpa.vercel.app/products/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMenuItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update menu item");
        }
        navigate("/menulist");
      })
      .catch((error) => {
        console.error("Error updating menu item:", error);
        setError("Failed to update menu item. Please try again.");
      });
  };

  return (
    <>
      <div className="app-bar">
        <div className="title">
          <h5 style={{ color: "#FFFFFF" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#FFFFFF" }}>
              IT Cafeteria
            </Link>
          </h5>
        </div>
      </div>
      <div className="store-setting-container">
        <h5 style={{ color: "#002336" }}>ตั้งค่าเมนูอาหาร</h5>
        <br />
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
                <img src={menuImage} alt="Menu Image" className="store-image" />
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
          <div className="button-group2">
            <button type="submit" className="submit-button">
              บันทึก
            </button>
            <button onClick={handleDelete} className="delete-button">
              ลบ
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
