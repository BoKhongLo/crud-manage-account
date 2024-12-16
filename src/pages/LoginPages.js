import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng sau khi đăng nhập thành công

export default function LoginPages() {
  const [username, setUsername] = useState(""); // Lưu tên người dùng
  const [password, setPassword] = useState(""); // Lưu mật khẩu
  const [isShow, setShow] = useState(false); // Để hiển thị mật khẩu
  const [error, setError] = useState(""); // Để lưu thông báo lỗi
  const [loading, setLoading] = useState(false); // Quản lý trạng thái loading khi gửi yêu cầu đăng nhập
  const navigate = useNavigate(); // Dùng để điều hướng đến trang khác sau khi đăng nhập thành công

  // Hàm xử lý khi người dùng nhấn nút "Show" hoặc "Hide" mật khẩu
  const handle_show = () => {
    setShow((prevState) => !prevState);
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    if (!username || !password) {
      setError("Vui lòng nhập tên người dùng và mật khẩu.");
      return;
    }

    setLoading(true); // Bắt đầu quá trình xử lý

    try {
      // Gửi yêu cầu đăng nhập
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          passWord: password,
        }),
      });

      const data = await response.json();

      // Kiểm tra xem đăng nhập thành công hay không
      if (response.status === 200) {
        // Nếu thành công, lưu token và trạng thái đăng nhập
        // localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("access_token", data.access_token); // Lưu token nếu có
        navigate("/home");  // Điều hướng đến trang home
      } else {
        // Nếu đăng nhập thất bại
        setError(data.message || "Thông tin đăng nhập không đúng.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Kết thúc quá trình xử lý
    }
  };

  return (
    <div>
      <form className="register-container">
        <h1>Đăng nhập</h1>
        <input
          autoComplete="off"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="input-field">
          <input
            autoComplete="off"
            id="password"
            type={isShow ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handle_show}>
            {isShow ? "Hide" : "Show"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}

        <button
          type="button"
          onClick={handleLogin}
          className="submit-btn"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
