import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getRoomTypes,
  createRoomType,
  deleteRoomType,
} from "../../services/roomType.service";

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [typeName, setTypeName] = useState("");
  const [maxOccupancy, setMaxOccupancy] = useState(1);
  const [description, setDescription] = useState("");

  const fetchRoomTypes = async () => {
    try {
      const data = await getRoomTypes();
      setRoomTypes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createRoomType({
        typeName,
        description,
        maxOccupancy,
      });

      setTypeName("");
      setDescription("");
      setMaxOccupancy(1);

      fetchRoomTypes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this room type?");
    if (!confirmDelete) return;

    try {
      await deleteRoomType(id);
      fetchRoomTypes();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-center text-slate-500">
          Loading room types...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Room Types</h1>
          <p className="text-slate-500 text-sm">
            Manage hotel room categories & capacity
          </p>
        </div>

        {/* Create Form */}
        <form
          onSubmit={handleCreate}
          className="rounded-2xl bg-white/70 backdrop-blur shadow-sm p-6 mb-6"
        >
          <h2 className="text-lg font-semibold mb-4 text-slate-700">
            Create New Room Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Room Type Name"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Max Occupancy"
              value={maxOccupancy}
              onChange={(e) => setMaxOccupancy(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white
            hover:bg-blue-700 transition shadow-sm"
          >
            + Create Room Type
          </button>
        </form>

        {/* Table */}
        <div className="rounded-2xl bg-white/70 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left font-medium">Name</th>
                <th className="p-4 text-left font-medium">Description</th>
                <th className="p-4 text-left font-medium">Max Occupancy</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {roomTypes.map((roomType, index) => (
                <tr
                  key={roomType.id}
                  className={`
                    hover:bg-slate-50 transition
                    ${index !== roomTypes.length - 1 ? "border-b border-slate-100" : ""}
                  `}
                >
                  <td className="p-4 font-medium text-slate-800">
                    {roomType.typeName}
                  </td>

                  <td className="p-4 text-slate-600">
                    {roomType.description || "-"}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      {roomType.maxOccupancy} guests
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(roomType.id)}
                      className="px-3 py-1 rounded-lg text-sm font-medium
                      bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {roomTypes.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No room types found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RoomTypes;
