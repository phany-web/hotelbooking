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
    const confirmDelete = window.confirm("Delete this staff?");
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
        <div className="p-10 text-center text-gray-500">Loading staff...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Staff Management
            </h1>
            <p className="text-slate-500 text-sm">
              Manage hotel staff accounts & permissions
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium
            hover:bg-blue-700 transition shadow-sm"
          >
            + Add Staff
          </button>
        </div>

        {/* Modal */}
        {openModal && (
          <StaffModal
            onClose={() => setOpenModal(false)}
            onSuccess={fetchStaffs}
          />
        )}

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-600 text-sm">
              <tr>
                <th className="p-4 text-left font-medium">Name</th>
                <th className="p-4 text-left font-medium">Email</th>
                <th className="p-4 text-left font-medium">Phone</th>
                <th className="p-4 text-left font-medium">Status</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {staffs.map((staff, index) => (
                <tr
                  key={staff.id}
                  className={`
                    hover:bg-slate-50 transition
                    ${index !== staffs.length - 1 ? "border-b border-slate-100" : ""}
                  `}
                >
                  <td className="p-4 font-medium text-slate-800">
                    {staff.fullName}
                  </td>

                  <td className="p-4 text-slate-600">{staff.email}</td>

                  <td className="p-4 text-slate-600">
                    {staff.phone || "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        staff.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {staff.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(staff.id)}
                      className="px-3 py-1 rounded-lg text-sm font-medium
                      bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {staffs.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No staff found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Staff;