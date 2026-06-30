import { useEffect, useState } from "react";

import { createRoom } from "../../services/room.service";
import { getRoomTypes } from "../../services/roomType.service";
import { getAllHotels } from "../../services/hotel.service";
import { getCurrentUser } from "../../services/auth.service";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const RoomModal = ({ onClose, onSuccess }: Props) => {
  const user = getCurrentUser();

  const [hotels, setHotels] = useState<any[]>([]);
  const [roomTypes, setRoomTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    roomNumber: "",
    floorNumber: 1,
    price: 0,
    hotelId: "",
    roomTypeId: "",
  });

  const inputStyle =
    "w-full px-4 py-3 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500";

  // LOAD DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        const [types, hotelsData] = await Promise.all([
          getRoomTypes(),
          getAllHotels(),
        ]);

        setRoomTypes(types);
        setHotels(hotelsData);

        // STAFF auto assign hotel
        if (user?.role === "STAFF" && user?.hotelId) {
          setFormData((prev) => ({
            ...prev,
            hotelId: user.hotelId,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.roomNumber) return alert("Room number is required");
    if (!formData.hotelId) return alert("Please select hotel");
    if (!formData.roomTypeId) return alert("Please select room type");
    if (formData.price <= 0) return alert("Price must be greater than 0");

    try {
      setLoading(true);

      await createRoom(formData);

      alert("Room created successfully 🎉");

      onSuccess();
      onClose();
    } catch (error: any) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 space-y-5 shadow-xl">

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold">Create New Room</h2>
          <p className="text-slate-500 text-sm">
            Add room to selected hotel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ROOM NUMBER */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Room Number
            </label>
            <input
              className={inputStyle}
              placeholder="Example: A101"
              value={formData.roomNumber}
              onChange={(e) =>
                setFormData({ ...formData, roomNumber: e.target.value })
              }
            />
          </div>

          {/* FLOOR */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Floor Number
            </label>
            <input
              type="number"
              className={inputStyle}
              value={formData.floorNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  floorNumber: Number(e.target.value),
                })
              }
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Price per Night
            </label>
            <input
              type="number"
              className={inputStyle}
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number(e.target.value),
                })
              }
            />
          </div>

          {/* HOTEL SELECT */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Hotel
            </label>

            <select
              className={inputStyle}
              value={formData.hotelId}
              onChange={(e) =>
                setFormData({ ...formData, hotelId: e.target.value })
              }
            >
              <option value="">Select Hotel</option>

              {hotels.map((hotel: any) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.hotelName}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM TYPE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Room Type
            </label>

            <select
              className={inputStyle}
              value={formData.roomTypeId}
              onChange={(e) =>
                setFormData({ ...formData, roomTypeId: e.target.value })
              }
            >
              <option value="">Select Room Type</option>

              {roomTypes.map((type: any) => (
                <option key={type.id} value={type.id}>
                  {type.typeName}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Saving..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomModal;