import axios from "axios";

// Lấy tất cả người dùng
const getAlluser = async () => {
  try {
    const token =localStorage.getItem("access_token");  // Lấy token
    const response = await axios.get('http://localhost:8080/user/getAll', {
      headers: {
        Authorization: `Bearer ${token}`,  // Thêm token vào header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

export default getAlluser;
