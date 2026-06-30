import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import BookingTable from "../../components/booking/BookingTable";

import {
  getMyHotelBookings,
  confirmBooking,
  checkInBooking,
  checkOutBooking,
} from "../../services/booking.service";

const Bookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getMyHotelBookings();
      setBookings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleConfirm = async (id: string) => {
    try {
      await confirmBooking(id);
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckIn = async (id: string) => {
    try {
      await checkInBooking(id);
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckOut = async (id: string) => {
    try {
      await checkOutBooking(id);
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-center text-slate-500">
          Loading bookings...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Booking Management
          </h1>
          <p className="text-slate-500 text-sm">
            Manage hotel reservations, check-in & check-out flow
          </p>
        </div>

        {/* Stats bar (optional future upgrade placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-slate-500 text-sm">Total Bookings</p>
            <h2 className="text-xl font-bold text-slate-800">
              {bookings.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-slate-500 text-sm">Pending</p>
            <h2 className="text-xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === "PENDING").length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-slate-500 text-sm">Confirmed</p>
            <h2 className="text-xl font-bold text-blue-600">
              {bookings.filter((b) => b.status === "CONFIRMED").length}
            </h2>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <BookingTable
            bookings={bookings}
            onConfirm={handleConfirm}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Bookings;
