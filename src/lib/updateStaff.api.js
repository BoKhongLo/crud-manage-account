import axios from "axios";

const staff_update = async (userId, updatedUser) => {
  try {
    const response = await axios.put(`http://localhost:8080/user/${userId}/update`, updatedUser);
    console.log('User updated:', response.data);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export default staff_update