import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { getHotelById } from "../../services/hotel.service";

const HotelDetail = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchHotel(id);
    }
  }, [id]);

  const fetchHotel = async (hotelId: string) => {
    try {
      const res = await getHotelById(hotelId);
      setHotel(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-20 text-center">
          Loading hotel...
        </div>
      </MainLayout>
    );
  }

  if (!hotel) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-20 text-center">
          Hotel not found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Image */}
        <img
          src={
            hotel.images?.[0]?.imageUrl ||
            "https://via.placeholder.com/1200x500"
          }
          alt={hotel.hotelName}
          className="w-full h-112 object-cover rounded-2xl"
        />

        {/* Hotel Info */}
        <div className="mt-8">
          <h1 className="text-4xl font-bold">
            {hotel.hotelName}
          </h1>

          <p className="text-gray-500 mt-2">
            {hotel.city}, {hotel.country}
          </p>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">
              Description
            </h2>

            <p className="text-gray-700 leading-7">
              {hotel.description}
            </p>
          </div>
        </div>

        {/* Rooms */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
            Available Rooms
          </h2>

          <div className="space-y-4">
            {hotel.rooms?.map((room: any) => (
              <div
                key={room.id}
                className="border rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-xl">
                    {room.roomNumber}
                  </h3>

                  <p className="text-gray-500">
                    {room.roomType?.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    ${room.price}
                  </p>

                  <button className="mt-2 bg-blue-600 text-white px-5 py-2 rounded-lg">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
            Reviews
          </h2>

          {hotel.reviews?.length ? (
            hotel.reviews.map((review: any) => (
              <div
                key={review.id}
                className="border-b py-4"
              >
                <p className="font-semibold">
                  {review.user?.fullName}
                </p>

                <p className="text-yellow-500">
                  ⭐ {review.rating}/5
                </p>

                <p className="text-gray-600 mt-2">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default HotelDetail;