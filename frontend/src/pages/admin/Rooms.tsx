import { useEffect, useState, useCallback } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import { getMyHotelRooms } from "../../services/room.service";
import RoomModal from "../../components/room/RoomModal";

const Rooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // FETCH ROOMS (OPTIMIZED)
  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getMyHotelRooms();

      console.log("ROOMS FROM API =>", data); // DEBUG

      setRooms(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // INITIAL + REFRESH TRIGGER
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms, refreshKey]);

  // FORCE REFRESH AFTER CREATE
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-50 text-green-700";
      case "OCCUPIED":
        return "bg-blue-50 text-blue-700";
      case "MAINTENANCE":
        return "bg-red-50 text-red-700";
      default:
        return "bg-yellow-50 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-center text-slate-500">
          Loading rooms...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Rooms Management
            </h1>
            <p className="text-slate-500 text-sm">
              Manage hotel rooms, pricing & availability
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
          >
            + Add Room
          </button>
        </div>

        {/* MODAL */}
        {openModal && (
          <RoomModal
            onClose={() => setOpenModal(false)}
            onSuccess={() => {
              setOpenModal(false);
              handleRefresh(); // 🔥 IMPORTANT FIX
            }}
          />
        )}

        {/* TABLE */}
        <div className="rounded-2xl bg-white/80 shadow-sm overflow-hidden backdrop-blur">
          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left">Room No</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Hotel</th>
                <th className="p-4 text-left">Floor</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room, index) => (
                <tr
                  key={room.id}
                  className={`hover:bg-slate-50 transition ${
                    index !== rooms.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <td className="p-4 font-medium text-slate-800">
                    #{room.roomNumber}
                  </td>

                  <td className="p-4 text-slate-600">
                    {room.roomType?.typeName || "-"}
                  </td>

                  <td className="p-4 text-slate-600">
                    {room.hotel?.hotelName || "-"}
                  </td>

                  <td className="p-4 text-slate-600">
                    Floor {room.floorNumber}
                  </td>

                  <td className="p-4 font-medium text-slate-800">
                    ${room.price}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        room.status
                      )}`}
                    >
                      {room.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY STATE */}
          {rooms.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No rooms found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Rooms;