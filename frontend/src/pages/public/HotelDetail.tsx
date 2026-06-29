import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HotelGallery from "../../components/hotel/HotelGallery";
import HotelInfo from "../../components/hotel/HotelInfo";

import { getHotelById } from "../../services/hotel.service";
import HotelRooms from "../../components/hotel/HotelRooms";
import type { Hotel } from "../../types/hotel.types";
import HotelReviews from "../../components/hotel/HotelReviews";

const HotelDetail = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState<Hotel | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const data = await getHotelById(id!);

        setHotel(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  if (!hotel) {
    return <div className="p-20 text-center">Hotel Not Found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <HotelGallery images={hotel.images} hotelName={hotel.hotelName} />

      <HotelInfo hotel={hotel} />
      <HotelRooms rooms={hotel.rooms} />
      <HotelReviews reviews={hotel.reviews} />
    </div>
  );
};

export default HotelDetail;
