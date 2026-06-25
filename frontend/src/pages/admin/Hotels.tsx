import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getAllHotels, deleteHotel } from "../../services/hotel.service";

import HotelModal from "../../components/hotel/HotelModal";

const Hotels = () => {
  const [hotels, setHotels] = useState<any[]>([]);
const [hotelId, setHotelId] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [selectedHotel, setSelectedHotel] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  
  const fetchHotels = async () => {
    try {
      const data = await getAllHotels();

      setHotels(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete hotel?");

    if (!confirmDelete) return;

    try {
      await deleteHotel(id);

      await fetchHotels();
    } catch (error: any) {
      console.log(error);

      alert(error?.response?.data?.message || "Cannot delete hotel");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <h1 className="text-xl font-bold">Loading...</h1>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hotels</h1>

          <p className="text-gray-500">Manage your hotels</p>
        </div>

        <button
          onClick={() => {
            setSelectedHotel(null);

            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add Hotel
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Hotel</th>

              <th className="p-4 text-left">Location</th>

              <th className="p-4 text-left">Phone</th>

              <th className="p-4 text-left">Rating</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{hotel.hotelName}</td>

                <td className="p-4">{hotel.location}</td>

                <td className="p-4">{hotel.phone || "-"}</td>

                <td className="p-4">⭐ {hotel.averageRating}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedHotel(hotel);

                        setOpenModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(hotel.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {hotels.length === 0 && (
          <div className="text-center py-10 text-gray-500">No hotels found</div>
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <HotelModal
          hotel={selectedHotel}
          onClose={() => setOpenModal(false)}
          onSuccess={fetchHotels}
        />
      )}
    </AdminLayout>
  );
};

export default Hotels;
