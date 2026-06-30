import AdminLayout from "../../layouts/AdminLayout";
import { useEffect, useState } from "react";

import { getReports } from "../../services/report.service";
import type {
  ReportResponse,
  ReportRange,
} from "../../services/report.service";

const Reports = () => {
  const [range, setRange] = useState<ReportRange>("today");
  const [data, setData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReports = async (r: ReportRange) => {
    try {
      setLoading(true);
      const res = await getReports(r);
      setData(res);
    } catch (error) {
      console.error("Failed to load reports", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(range);
  }, [range]);

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Reports Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Hotel performance analytics
            </p>
          </div>

          <select
            value={range}
            onChange={(e) =>
              setRange(e.target.value as ReportRange)
            }
            className="border px-3 py-2 rounded-lg bg-white shadow-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white p-4 rounded-xl shadow">
            Loading reports...
          </div>
        )}

        {/* CONTENT */}
        {!loading && data && (
          <>
            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Stat label="Bookings" value={data.totalBookings} />
              <Stat label="Revenue" value={`$${data.totalRevenue}`} />
              <Stat label="Check-ins" value={data.checkIns} />
              <Stat
                label="Occupancy"
                value={`${data.occupancyRate}%`}
              />
            </div>

            {/* EXTRA STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Stat
                label="Avg Booking Value"
                value={`$${data.avgBookingValue}`}
              />
              <Stat
                label="Cancellation Rate"
                value={`${data.cancellationRate}%`}
              />
              <Stat label="Peak Occupancy" value={data.peakOccupancy} />
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-semibold text-gray-700 mb-3">
                Recent Activities
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2">Date</th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {data.recentActivities.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-2">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td>{item.user}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.status === "PAID"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>${item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

/* Reusable Stat Card */
const Stat = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-bold text-gray-800">{value}</p>
  </div>
);

export default Reports;