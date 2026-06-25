import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import StaffModal from "../../components/staff/StaffModal";

import { getStaffs, deleteStaff } from "../../services/staff.service";

const Staff = () => {
  const [staffs, setStaffs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const fetchStaffs = async () => {
    try {
      const data = await getStaffs();
      setStaffs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff?",
    );

    if (!confirmDelete) return;

    try {
      await deleteStaff(id);
      fetchStaffs();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <h1 className="text-xl font-bold">Loading...</h1>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>

          <p className="text-gray-500">Manage your hotel staff</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Staff
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {openModal && (
          <StaffModal
            onClose={() => setOpenModal(false)}
            onSuccess={fetchStaffs}
          />
        )}
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {staffs.map((staff) => (
              <tr key={staff.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{staff.fullName}</td>

                <td className="p-4">{staff.email}</td>

                <td className="p-4">{staff.phone}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      staff.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {staff.isActive ? "Active" : "Disabled"}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {staffs.length === 0 && (
          <div className="text-center py-10 text-gray-500">No staff found</div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Staff;
