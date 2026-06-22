import { useEffect, useState } from "react";

import { createRoom } from "../../services/room.service";
import { getAllHotels } from "../../services/hotel.service";
import { getRoomTypes } from "../../services/roomType.service";
import { getCurrentUser } from "../../services/auth.service";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const RoomModal = ({ onClose, onSuccess }: Props) => {
  const user = getCurrentUser();
  const [hotels, setHotels] = useState<any[]>([]);
  const [roomTypes, setRoomTypes] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    roomNumber: "",
    floorNumber: 1,
    price: 0,
    hotelId: user?.hotelId || "",
    roomTypeId: "",
  });

  const loadData = async () => {
    try {
      const hotelData = await getAllHotels();

      const roomTypeData = await getRoomTypes();

      setHotels(hotelData);

      setRoomTypes(roomTypeData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.roomNumber) {
      return alert("Room number is required");
    }

    if (!formData.hotelId) {
      return alert("Hotel is required");
    }

    if (!formData.roomTypeId) {
      return alert("Room type is required");
    }

    if (formData.price <= 0) {
      return alert("Price must be greater than 0");
    }

    try {
      await createRoom(formData);

      alert("Room created successfully");

      onSuccess();
      onClose();
    } catch (error: any) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed to create room");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Room</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Room Number"
            className="w-full border p-3 rounded"
            value={formData.roomNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                roomNumber: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Floor Number"
            className="w-full border p-3 rounded"
            value={formData.floorNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                floorNumber: Number(e.target.value),
              })
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border p-3 rounded"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: Number(e.target.value),
              })
            }
          />

          {/* Hotel Dropdown */}
          {user?.role === "SUPER_ADMIN" && (
            <select
              className="w-full border p-3 rounded"
              value={formData.hotelId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hotelId: e.target.value,
                })
              }
            >
              <option value="">Select Hotel</option>

              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.hotelName}
                </option>
              ))}
            </select>
          )}

          {/* Room Type Dropdown */}
          <select
            className="w-full border p-3 rounded"
            value={formData.roomTypeId}
            onChange={(e) =>
              setFormData({
                ...formData,
                roomTypeId: e.target.value,
              })
            }
          >
            <option value="">Select Room Type</option>

            {roomTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.typeName}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomModal;
