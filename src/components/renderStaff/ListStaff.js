import React, { useEffect,useState  } from 'react'
import getAlluser from "../../lib/getStaff.api";
import StaffCard from './StaffCard';


export default function ListStaff() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAlluser()
      .then((data) => {
        console.log('Fetched data:', data); // Debug the response
        setUsers(data.data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);
  
  return (
    <div className="list-container">
      <h2>Danh sách nhân viên</h2>
      <table className="staff-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Tên đăng nhập</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Chức vụ</th>
            <th>Vai trò</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <StaffCard
              key={user._id}
              monggooseID = {user._id}
              id={user.id}
              name={user.name}
              userName={user.userName}
              phone={user.phone}
              address={user.address}
              position={user.position}
              role={user.role}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
