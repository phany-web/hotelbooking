import { useEffect, useState } from "react";
import api from "../../services/axios";
import Sidebar from "../../components/dashboard/Sidebar";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");

      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <Sidebar role="SUPER_ADMIN" />
    {/* Content */}
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Users Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage all system users
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            Users List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Role
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user: any) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {user.fullName}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                      {user.role.roleName}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {user.isActive ? (
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                        Disabled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

};

export default Users;
