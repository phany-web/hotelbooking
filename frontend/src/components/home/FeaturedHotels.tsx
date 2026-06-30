import { useEffect, useState } from "react";

import HotelCard from "../hotel/HotelCard";
import { getPublicHotels } from "../../services/hotel.service";

const FeaturedHotels = () => {
  const [hotels, setHotels] = useState<any[]>([]);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const res = await getPublicHotels();

      setHotels(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-8">
        Featured Hotels
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedHotels;