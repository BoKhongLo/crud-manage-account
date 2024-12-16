import axios from "axios";

const handle_create = async (newUser) => {
  const accessToken = localStorage.getItem('access_token'); // Hoặc lấy từ state nếu bạn lưu ở đó
  try {
    const response = await axios.post('http://localhost:8080/user/create', newUser, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '', // Nếu có token thì thêm vào header
      },
    });

    if (response.data && response.data.message === 'User Created successfully') {
      return response; // Trả về response nếu tạo thành công
    } else {
      throw new Error('Tạo người dùng thất bại hoặc thông tin không đúng'); // Nếu có lỗi từ API
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Ném lỗi để có thể bắt trong hàm gọi
  }
};

export default handle_create;
