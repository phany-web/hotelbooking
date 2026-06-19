import { useEffect, useState } from "react";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import { getAllBookings } from "../../services/booking.service";

const Bookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();

      console.log("Bookings:", data);

      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Booking Management
        </h1>

        <p className="text-gray-500">
          Manage all bookings in system
        </p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Hotel
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Check In
              </th>

              <th className="p-4 text-left">
                Check Out
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  {booking.user?.fullName || "N/A"}
                </td>

                <td className="p-4">
                  {booking.bookingDetails?.[0]?.room?.hotel
                    ?.hotelName || "N/A"}
                </td>

                <td className="p-4">
                  ${booking.totalAmount}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "CONFIRMED"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="p-4">
                  {new Date(
                    booking.checkInDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(
                    booking.checkOutDate
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No bookings found
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
};

export default Bookings;