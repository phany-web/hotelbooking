import { useEffect, useState } from "react";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import StatCard from "../../components/dashboard/StatCard";
import { getSystemDashboard } from "../../services/dashboard.service";

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const data = await getSystemDashboard();

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <SuperAdminLayout>
        <h1 className="text-xl font-bold">Loading...</h1>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>

        <p className="text-gray-500">Overview of entire hotel booking system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats?.totalUsers || 0} />

        <StatCard title="Total Hotels" value={stats?.totalHotels || 0} />

        <StatCard title="Total Rooms" value={stats?.totalRooms || 0} />

        <StatCard title="Total Bookings" value={stats?.totalBookings || 0} />

        <StatCard title="Total Reviews" value={stats?.totalReviews || 0} />

        <StatCard title="Revenue ($)" value={stats?.totalRevenue || 0} />
      </div>
    </SuperAdminLayout>
  );
};

export default Dashboard;
