import { useEffect, useState } from "react";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";

import { getAllHotels, deleteHotel } from "../../services/hotel.service";

const Hotels = () => {
  const [hotel, setHotels] = useState<any[]>([]);

  const fetchHotels = async () => {
    try {
      const data = await getAllHotels();

      setHotels(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete hotel?");

    if (!confirmDelete) return;

    await deleteHotel(id);

    fetchHotels();
  };

  return (
    <SuperAdminLayout>
      <h1 className="text-3xl font-bold mb-6">Hotels</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Hotel</th>

              <th className="p-4 text-left">Location</th>

              <th className="p-4 text-left">Phone</th>

              <th className="p-4 text-left">Rating</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {hotel.map((hotel) => (
              <tr key={hotel.id} className="border-b">
                <td className="p-4">{hotel.hotelName}</td>

                <td className="p-4">{hotel.location}</td>

                <td className="p-4">{hotel.phone}</td>

                <td className="p-4">{hotel.averageRating}</td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(hotel.id)}
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
    </SuperAdminLayout>
  );
};

export default Hotels;
