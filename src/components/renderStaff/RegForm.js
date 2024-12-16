import React, { useState } from "react";
import handle_create from '../../lib/createStaff.api';

const RegForm = ({ onUserCreated }) => {
  const [isShow, setShow] = useState(false);

  const handle_show = () => {
    setShow((prevState) => !prevState);
  };

  const [newUser, setNewUser] = useState({
    name: "",
    userName: "",
    passWord: "",
    role: "",
    position: "",
    address: "",
    phone: "",
  });

  const create = async () => {
    try {
      if (
        newUser.name &&
        newUser.userName &&
        newUser.passWord &&
        newUser.role
      ) {
        const response = await handle_create(newUser); // Lấy response từ handle_create
        if (response && response.data && response.data.message === 'User Created successfully') {
          console.log("User Created:", response.data);
          alert("Tạo mới thành công!"); // Thông báo thành công nếu API trả về success
        } else {
          alert("Thông tin đã tồn tại hoặc không đúng định dạng"); // Nếu response không đúng hoặc có lỗi từ server
        }
      } else {
        alert("Hãy điền toàn bộ thông tin!"); // Thông báo nếu thiếu thông tin
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Lỗi: " + error.message); // Thông báo lỗi nếu có lỗi xảy ra trong quá trình gọi API
    }
  };
  

  return (
    <div>
      <form className="register-container">
        <h1>Tạo tài khoản mới</h1>
        <h3>Thông tin</h3>
        <input
          autoComplete="off"
          id="name"
          type="text"
          placeholder="Họ tên"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          autoComplete="off"
          id="username"
          type="text"
          placeholder="Username"
          value={newUser.userName}
          onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
        />
        <div className="input-field">
          <input
            autoComplete="off"
            id="password"
            type={isShow ? "text" : "password"}
            placeholder="Password"
            value={newUser.passWord}
            onChange={(e) =>
              setNewUser({ ...newUser, passWord: e.target.value })
            }
          />
          <button type="button" onClick={handle_show}>
            {isShow ? "Hide" : "Show"}
          </button>
        </div>

        <input
          autoComplete="off"
          id="position"
          type="text"
          placeholder="Chức vụ"
          value={newUser.position}
          onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
        />
        <input
          autoComplete="off"
          id="address"
          type="text"
          placeholder="Địa chỉ"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
        />
        <input
          autoComplete="off"
          id="phone"
          type="text"
          placeholder="Số điện thoại"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <div className="role-section">
          <h3>Vai trò</h3>
          <div className="role-div">
            <input
              id="check_admin"
              className="check"
              type="checkbox"
              name="role"
              value="admin"
              checked={newUser.role === "admin"}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
            <label htmlFor="check_admin" className="role-option">
              Admin
            </label>
          </div>
          <div className="role-div">
            <input
              id="check_user"
              className="check"
              type="checkbox"
              name="role"
              value="user"
              checked={newUser.role === "user"}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
            <label htmlFor="check_user" className="role-option">
              Staff
            </label>
          </div>
        </div>

        <button type="button" onClick={create} className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegForm;
