import React , { useState }from "react";
import { getUserById, updateUser, deleteUser } from "../../lib/staffById.api";

const StaffCard = ({monggooseID, id, name, userName, phone, address, position, role, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    userName: '',
    phone: '',
    address: '',
    position: '',
    role: ''
  });
  const fetchUserData = async (monggooseID) => {
    try {
      const data = await getUserById(monggooseID);
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
    // Open modal and fetch user data
    const openModal = () => {
      setIsModalOpen(true);
      fetchUserData(monggooseID);
    };
    // Handle save after editing
    const handleSave = async () => {
      try {
        const updatedUser = await updateUser(monggooseID, userData);
        console.clear();
        console.log("User updated:", updatedUser);
        setIsModalOpen(false);
        window.location.reload()
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  
    // Handle delete confirmation
    const handleDelete = async () => {
      try {
        await deleteUser(monggooseID);
        console.log("User deleted");
        setIsDeleteConfirmOpen(false);
        window.location.reload()
        onDelete(monggooseID); // Notify parent component to remove user from the list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
    return (
      <>
        <tr className="staff-card">
          <td>{id}</td>
          <td>{name}</td>
          <td>{userName}</td>
          <td>{phone}</td>
          <td>{address}</td>
          <td>{position}</td>
          <td>{role}</td>
          <td>
            {/* Edit Button */}
            <button onClick={openModal} className="edit-button">Sửa</button>
            {/* Delete Button */}
            <button onClick={() => setIsDeleteConfirmOpen(true)} className="delete-button">Xóa</button>
          </td>
        </tr>
  
        {/* Modal for Editing */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Sửa Thông Tin</h2>
              <input
                type="text"
                placeholder={name || "Tên"}
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder={userName || "Tên đăng nhập"}
                value={userData.userName}
                onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
              />
              <input
                type="text"
                placeholder={phone || "Số điện thoại"}
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
              <input
                type="text"
                placeholder={address || "Địa chỉ"}
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
              <input
                type="text"
                placeholder={position || "Chức vụ"}
                value={userData.position}
                onChange={(e) => setUserData({ ...userData, position: e.target.value })}
              />
              <input
                type="text"
                placeholder={role || "Vai trò"}
                value={userData.role}
                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              />
              <button onClick={handleSave} className="save-button">Lưu</button>
              <button onClick={() => setIsModalOpen(false)} className="close-button">Đóng</button>
            </div>
          </div>
        )}
  
        {/* Confirmation Modal for Deleting */}
        {isDeleteConfirmOpen && (
          <div className="confirmation-modal">
            <div className="confirmation-modal-content">
              <h3>Xác nhận xóa ?</h3>
              <button onClick={handleDelete} className="confirm-delete-button">Yes</button>
              <button onClick={() => setIsDeleteConfirmOpen(false)} className="cancel-delete-button">No</button>
            </div>
          </div>
        )}
      </>
    );
  };

export default StaffCard;