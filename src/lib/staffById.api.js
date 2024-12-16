import axios from "axios";

// Lấy thông tin người dùng theo ID
export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("access_token");  // Lấy token
    const response = await axios.get(`http://localhost:8080/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Thêm token vào header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (id, userData) => {
  try {
    const token = localStorage.getItem("access_token");  // Lấy token
    const response = await axios.put(`http://localhost:8080/user/${id}/update`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Thêm token vào header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Xóa người dùng
export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("access_token");  // Lấy token
    const response = await axios.delete(`http://localhost:8080/user/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Thêm token vào header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
