interface Props {
  bookings: any[];
  onConfirm: (id: string) => void;
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
}

const BookingTable = ({
  bookings,
  onConfirm,
  onCheckIn,
  onCheckOut,
}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Customer</th>

            <th className="p-4 text-left">Room</th>

            <th className="p-4 text-left">Hotel</th>

            <th className="p-4 text-left">Check In</th>

            <th className="p-4 text-left">Check Out</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => {
            const detail = booking.bookingDetails?.[0];

            return (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{booking.user.fullName}</td>

                <td className="p-4">{detail?.room?.roomNumber}</td>

                <td className="p-4">{detail?.room?.hotel?.hotelName}</td>

                <td className="p-4">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {booking.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2">
                  {booking.status === "PENDING" && (
                    <button
                      onClick={() => onConfirm(booking.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Confirm
                    </button>
                  )}

                  {booking.status === "CONFIRMED" && (
                    <button
                      onClick={() => onCheckIn(booking.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Check In
                    </button>
                  )}

                  {booking.status === "CHECKED_IN" && (
                    <button
                      onClick={() => onCheckOut(booking.id)}
                      className="bg-purple-600 text-white px-3 py-1 rounded"
                    >
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {bookings.length === 0 && (
        <div className="text-center py-10 text-gray-500">No bookings found</div>
      )}
    </div>
  );
};

export default BookingTable;
