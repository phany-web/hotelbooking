import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getMyHotelRooms } from "../../services/room.service";

import RoomModal from "../../components/room/RoomModal";

const Rooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const fetchRooms = async () => {
    try {
      const data = await getMyHotelRooms();

      setRooms(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Rooms Management</h1>

          <p className="text-gray-500">Manage hotel rooms</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Room
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Room No</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Floor</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{room.roomNumber}</td>

                <td className="p-4">{room.roomType?.typeName}</td>

                <td className="p-4">{room.floorNumber}</td>

                <td className="p-4">${room.price}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      room.status === "AVAILABLE"
                        ? "bg-green-100 text-green-700"
                        : room.status === "OCCUPIED"
                          ? "bg-blue-100 text-blue-700"
                          : room.status === "MAINTENANCE"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {room.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rooms.length === 0 && (
          <div className="text-center py-10 text-gray-500">No rooms found</div>
        )}
      </div>

      {openModal && (
        <RoomModal onClose={() => setOpenModal(false)} onSuccess={fetchRooms} />
      )}
    </AdminLayout>
  );
};

export default Rooms;
