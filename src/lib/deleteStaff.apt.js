import axios from "axios";

const staff_delete = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:8080/user/${userId}/delete`);
    console.log('User deleted:', response.data);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export default staff_delete

