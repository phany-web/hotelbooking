import { useEffect, useState } from "react";

import MainLayout from "../../../layouts/MainLayout";

import { getHotels } from "../../../services/hotel.service";

const Home = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await getHotels();

      setHotels(res.data.data || []);
    } catch (error) {
      console.error("Failed to load hotels", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold mb-4">
            Find Your Perfect Stay
          </h1>

          <p className="text-xl opacity-90">
            Discover hotels, resorts and apartments worldwide
          </p>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Featured Hotels
        </h2>

        {loading ? (
          <div className="text-center py-10">
            Loading hotels...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel: any) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
              >
                <img
                  src={
                    hotel.images?.[0]?.imageUrl ||
                    "https://via.placeholder.com/600x400"
                  }
                  alt={hotel.hotelName}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2">
                    {hotel.hotelName}
                  </h3>

                  <p className="text-gray-500 text-sm mb-3">
                    {hotel.city}, {hotel.country}
                  </p>

                  <p className="text-gray-600 line-clamp-2">
                    {hotel.description}
                  </p>

                  <button
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default Home;