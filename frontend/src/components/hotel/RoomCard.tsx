interface Props {
  room: any;
  onSelect: () => void;
}

const RoomCard = ({ room, onSelect }: Props) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{room.roomType?.typeName}</h3>
        <p className="text-sm text-gray-500">
          Room {room.roomNumber}
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold text-blue-600">
          ${room.price}
        </p>

        <button
          onClick={onSelect}
          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default RoomCard;