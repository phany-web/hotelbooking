import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllHotels, deleteHotel } from "../../services/hotel.service";
import HotelModal from "../../components/hotel/HotelModal";

const Hotels = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);

  const fetchHotels = async () => {
    try {
      const data = await getAllHotels();
      setHotels(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete hotel?")) return;
    await deleteHotel(id);
    fetchHotels();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 text-slate-500">Loading hotels...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Hotels</h1>
            <p className="text-slate-500">Manage your hotel inventory</p>
          </div>

          <button
            onClick={() => {
              setSelectedHotel(null);
              setOpenModal(true);
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:shadow-lg transition"
          >
            + Add Hotel
          </button>
        </div>

        {/* Table Card */}
        <div className="rounded-2xl bg-white/70 backdrop-blur shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 bg-slate-100/60">
              <tr>
                <th className="p-4">Hotel</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Rating</th>
                <th className="text-right p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {hotels.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-medium">{h.hotelName}</td>
                  <td>{h.location}</td>
                  <td>{h.phone || "-"}</td>
                  <td>⭐ {h.averageRating}</td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedHotel(h);
                        setOpenModal(true);
                      }}
                      className="px-3 py-1 rounded-lg bg-amber-100 text-amber-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(h.id)}
                      className="px-3 py-1 rounded-lg bg-red-100 text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {openModal && (
          <HotelModal
            hotel={selectedHotel}
            onClose={() => setOpenModal(false)}
            onSuccess={fetchHotels}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Hotels;