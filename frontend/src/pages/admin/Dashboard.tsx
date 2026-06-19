import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import StatCard from "../../components/dashboard/StatCard";

import {
  getHotelDashboard,
  getRecentBookings,
} from "../../services/dashboard.service";

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const dashboard = await getHotelDashboard();
      const bookings = await getRecentBookings();

      setStats(dashboard);
      setRecentBookings(bookings);
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
      <AdminLayout>
        <h1 className="text-xl font-bold">Loading...</h1>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hotel Dashboard</h1>

        <p className="text-gray-500">Overview of your hotel performance</p>
      </div>

      {/* Room Statistics */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Room Statistics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard title="Total Rooms" value={stats?.totalRooms || 0} />

          <StatCard
            title="Available Rooms"
            value={stats?.availableRooms || 0}
          />

          <StatCard title="Occupied Rooms" value={stats?.occupiedRooms || 0} />

          <StatCard
            title="Maintenance Rooms"
            value={stats?.maintenanceRooms || 0}
          />

          <StatCard
            title="Occupancy Rate"
            value={`${stats?.occupancyRate || 0}%`}
          />
        </div>
      </div>

      {/* Booking Statistics */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Booking Statistics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Bookings" value={stats?.totalBookings || 0} />

          <StatCard title="Pending" value={stats?.pendingBookings || 0} />

          <StatCard title="Confirmed" value={stats?.confirmedBookings || 0} />

          <StatCard title="Completed" value={stats?.completedBookings || 0} />
        </div>
      </div>

      {/* Revenue */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Revenue</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Revenue ($)"
            value={stats?.totalRevenue || 0}
          />
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Customer</th>

                <th className="p-4 text-left">Hotel</th>

                <th className="p-4 text-left">Amount</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Check In</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings?.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{booking.user?.fullName}</td>

                  <td className="p-4">
                    {booking.bookingDetails?.[0]?.room?.hotel?.hotelName}
                  </td>

                  <td className="p-4">${booking.totalAmount}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "CONFIRMED"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {recentBookings.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No recent bookings found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
