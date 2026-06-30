import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosClient from "../../services/axios";

const Booking = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const roomId = params.get("roomId");

  const [room, setRoom] = useState<any>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await axiosClient.get(`/room/${roomId}`);
      setRoom(res.data.data);
    };

    if (roomId) fetchRoom();
  }, [roomId]);

  const handleBooking = async () => {
    try {
      setLoading(true);

      await axiosClient.post("/booking", {
        roomId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      });

      alert("Booking Success!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!room) return <p className="p-6">Loading room...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Booking</h1>

      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="font-semibold">
          Room {room.roomNumber}
        </h2>

        <p className="text-blue-600 font-bold mt-2">
          ${room.price}
        </p>

        {/* DATES */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default Booking;