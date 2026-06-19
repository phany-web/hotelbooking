import { useEffect, useState } from "react";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import CreateAdminForm from "../../components/CreateAdminForm";

import {
  getAllAdmins,
  disableAdmin,
  enableAdmin,
} from "../../services/admin.service";

const Admins = () => {
  const [admins, setAdmins] = useState<any[]>([]);

  const fetchAdmins = async () => {
    try {
      const data = await getAllAdmins();
      setAdmins(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDisable = async (id: string) => {
    await disableAdmin(id);
    fetchAdmins();
  };

  const handleEnable = async (id: string) => {
    await enableAdmin(id);
    fetchAdmins();
  };
  return (
    <SuperAdminLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Management</h1>
          <CreateAdminForm onSuccess={fetchAdmins} />;
      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Phone</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b">
                <td className="p-4">{admin.fullName}</td>

                <td className="p-4">{admin.email}</td>

                <td className="p-4">{admin.phone}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      admin.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {admin.isActive ? "Active" : "Disabled"}
                  </span>
                </td>

                <td className="p-4">
                  {admin.isActive ? (
                    <button
                      onClick={() => handleDisable(admin.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnable(admin.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Enable
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SuperAdminLayout>
  );
};

export default Admins;
