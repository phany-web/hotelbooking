import type { Room } from "../../types/hotel.types";

interface Props {
  rooms: Room[];
}

const HotelRooms = ({ rooms }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-5">Available Rooms</h2>

      {rooms.length === 0 && <p>No rooms available.</p>}

      <div className="space-y-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg p-5 flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">Room {room.roomNumber}</h3>

              <p>{room.roomType.typeName}</p>

              <p>Capacity : {room.roomType.maxOccupancy}</p>

              <p>Floor : {room.floorNumber ?? "-"}</p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                ${Number(room.price)}
              </p>

              <p className="mb-3">{room.status}</p>

              <button
                disabled={room.status !== "AVAILABLE"}
                className="bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelRooms;
