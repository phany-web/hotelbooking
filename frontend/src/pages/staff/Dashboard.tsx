import { useEffect, useState } from "react";
import axios from "../../services/axios";
import AdminLayout from "../../layouts/AdminLayout";

type DashboardData = {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
};

const StaffDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/staff-tasks/dashboard");

      setData(res.data.data);
    } catch (err) {
      console.log("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Staff Dashboard</h1>

        <p className="text-gray-500 mt-1">
          Overview of your tasks and performance
        </p>

        {loading ? (
          <div className="mt-6 text-gray-500">Loading dashboard...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {/* TOTAL */}
            <div className="bg-white p-4 rounded-xl shadow border">
              <p className="text-gray-500 text-sm">Total Tasks</p>
              <h2 className="text-2xl font-bold">{data?.total}</h2>
            </div>

            {/* PENDING */}
            <div className="bg-yellow-50 p-4 rounded-xl shadow border border-yellow-200">
              <p className="text-yellow-600 text-sm">Pending</p>
              <h2 className="text-2xl font-bold text-yellow-700">
                {data?.pending}
              </h2>
            </div>

            {/* IN PROGRESS */}
            <div className="bg-blue-50 p-4 rounded-xl shadow border border-blue-200">
              <p className="text-blue-600 text-sm">In Progress</p>
              <h2 className="text-2xl font-bold text-blue-700">
                {data?.inProgress}
              </h2>
            </div>

            {/* COMPLETED */}
            <div className="bg-green-50 p-4 rounded-xl shadow border border-green-200">
              <p className="text-green-600 text-sm">Completed</p>
              <h2 className="text-2xl font-bold text-green-700">
                {data?.completed}
              </h2>
            </div>
          </div>
        )}

        {/* QUICK INFO SECTION */}
        <div className="mt-8 bg-white p-5 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-3">Today Summary</h2>

          <div className="text-gray-600 text-sm space-y-2">
            <p>• Check your assigned cleaning tasks</p>
            <p>• Start task when you begin work</p>
            <p>• Mark task completed after finishing room cleaning</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StaffDashboard;
