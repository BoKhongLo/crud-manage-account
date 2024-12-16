import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginPages from "./pages/LoginPages";
import Staff from "./pages/Staff";

function Navbar() {
  const navigate = useNavigate(); // Sử dụng useNavigate trong component con của Router

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Xóa access_token khỏi localStorage
    navigate('/login'); // Chuyển hướng về trang đăng nhập
  };

  return (
    <nav className="navbar">
      <div className="logo">Quản lý nhân sự</div>
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Nhân sự</Link></li>
        <li><Link to="/login" className="nav-link">Đăng nhập</Link></li>
        <li>
          <button onClick={handleLogout} className="nav-link">Đăng xuất</button>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Đưa Navbar vào đây */}
        <Routes>
          <Route path="/" element={<Staff />} />
          <Route path="/home" element={<Staff />} />
          <Route path="/login" element={<LoginPages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
