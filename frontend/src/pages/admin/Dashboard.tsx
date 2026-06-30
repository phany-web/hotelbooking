import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getHotelDashboard,
  getRecentBookings,
  getRevenueChart,
} from "../../services/dashboard.service";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const StatCard = ({ title, value, icon }: any) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold mt-1">{value}</h2>
        </div>

        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const [dashboard, bookings, revenue] = await Promise.all([
        getHotelDashboard(),
        getRecentBookings(),
        getRevenueChart(),
      ]);

      setStats(dashboard);
      setRecentBookings(bookings);
      setRevenueData(revenue);
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
        <div className="h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500">
          Monitor your hotel performance in real time
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        <StatCard title="Total Rooms" value={stats?.totalRooms || 0} />
        <StatCard title="Available" value={stats?.availableRooms || 0} />
        <StatCard title="Occupied" value={stats?.occupiedRooms || 0} />
        <StatCard title="Maintenance" value={stats?.maintenanceRooms || 0} />
        <StatCard
          title="Occupancy"
          value={`${stats?.occupancyRate || 0}%`}
        />
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* BOOKINGS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Bookings Overview</h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-bold">{stats?.totalBookings}</span>
            </div>
            <div className="flex justify-between">
              <span>Pending</span>
              <span className="text-yellow-500 font-bold">
                {stats?.pendingBookings}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Confirmed</span>
              <span className="text-blue-500 font-bold">
                {stats?.confirmedBookings}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Completed</span>
              <span className="text-green-500 font-bold">
                {stats?.completedBookings}
              </span>
            </div>
          </div>
        </div>

        {/* REVENUE CARD */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Revenue Trend</h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b">
          <h3 className="font-semibold">Recent Bookings</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Hotel</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Check In</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{b.user?.fullName}</td>

                  <td className="p-4">
                    {b.bookingDetails?.[0]?.room?.hotel?.hotelName}
                  </td>

                  <td className="p-4 font-semibold">${b.totalAmount}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : b.status === "CONFIRMED"
                          ? "bg-blue-100 text-blue-700"
                          : b.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(b.checkInDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {recentBookings.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No bookings found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;