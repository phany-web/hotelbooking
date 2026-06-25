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
        <h1>Loading bookings...</h1>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Booking Management</h1>

        <p className="text-gray-500">Manage all hotel bookings</p>
      </div>

      <BookingTable
        bookings={bookings}
        onConfirm={handleConfirm}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
      />
    </AdminLayout>
  );
};

export default Bookings;
