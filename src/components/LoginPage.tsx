import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Clear any previous error message
      setError(null);
      // Construct the URL with username and password query parameters
      const url = `https://order-api-patiparnpa-patiparnpas-projects.vercel.app/authos/login?username=${encodeURIComponent(
        userName
      )}&password=${encodeURIComponent(userPassword)}`;

      // Send a GET request to the login API
      const response = await fetch(url);

      if (!response.ok) {
        // Check if the error is due to invalid credentials
        if (response.status === 401) {
          throw new Error(
            "The user with the provided username or password does not exist."
          );
        } else {
          throw new Error("Failed to login");
        }
      }

      // Successful login
      const data = await response.json();

      // Extract store ID from the response
      const storeID = data.storeid;

      // Send a POST request to the login_store API
      const storeResponse = await fetch(
        "https://order-api-patiparnpa-patiparnpas-projects.vercel.app/auth/login_store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            storeID: storeID,
          }),
        }
      );

      if (!storeResponse.ok) {
        throw new Error("Failed to obtain access token");
      }

      // Successful store login
      const tokenData = await storeResponse.json();

      // Save access token in cookie
      // Replace 'access_token' with the name of your cookie
      document.cookie = `access_token=${tokenData.access_token}`;

      if (data.usertype === "seller") {
        navigate("/");
        window.location.reload();
      } else if (data.usertype === "admin") {
        navigate("/admin");
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Login error:", error);
      // Handle login error, e.g., display error message to the user
      setError(
        "The user with the provided username or password does not exist."
      );
    }
  };

  return (
    <>
      <div className="app-bar">
        <div className="title">
          <h5 style={{ color: "#FFFFFF" }}>
            <Link to="" style={{ textDecoration: "none", color: "#FFFFFF" }}>
              IT Cafeteria
            </Link>
          </h5>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="centered-container">
        <div className="store-setting-container">
          <h4
            style={{
              textAlign: "center",
              padding: "0 100px",
              maxWidth: "100%",
              whiteSpace: "nowrap",
            }}
          >
            เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน
          </h4>
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              marginBottom: "25px",
            }}
          >
            กรอกหมายเลขโทรศัพท์และรหัสผ่านเพื่อเข้าสู่ระบบ
          </p>
          <form onSubmit={handleSubmit} className="store-setting-form">
            <div className="form-group">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                style={{ flex: "1", border: "2px solid #ddd" }}
                placeholder="หมายเลขโทรศัพท์"
                required
              />
            </div>
            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="form-control"
                style={{ flex: "1", border: "2px solid #ddd" }}
                placeholder="รหัสผ่าน"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-password-button"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <br />
            {error && (
              <p style={{ color: "red", textAlign: "center", fontSize:'smaller' }}>
                The user with the provided username or password does not exist.
              </p>
            )}
            <div className="button-group2">
              <button type="submit" className="login-button">
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};