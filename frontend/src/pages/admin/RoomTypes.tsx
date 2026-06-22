import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getRoomTypes,
  createRoomType,
  deleteRoomType,
} from "../../services/roomType.service";

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState<any[]>([]);

  const [typeName, setTypeName] = useState("");
  const [maxOccupancy, setMaxOccupancy] = useState(1);
  const [description, setDescription] = useState("");

  const fetchRoomTypes = async () => {
    try {
      const data = await getRoomTypes();

      setRoomTypes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    await createRoomType({
      typeName,
      description,
      maxOccupancy,
    });

    setTypeName("");
    setDescription("");

    fetchRoomTypes();
  };

  const handleDelete = async (id: string) => {
    await deleteRoomType(id);

    fetchRoomTypes();
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Room Types</h1>

      <form
        onSubmit={handleCreate}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Type Name"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Max Occupancy"
            value={maxOccupancy}
            onChange={(e) => setMaxOccupancy(Number(e.target.value))}
            className="border p-2 rounded"
          />
        </div>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {roomTypes.map((roomType) => (
              <tr key={roomType.id} className="border-t">
                <td className="p-4">{roomType.typeName}</td>

                <td className="p-4">{roomType.description}</td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(roomType.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default RoomTypes;
