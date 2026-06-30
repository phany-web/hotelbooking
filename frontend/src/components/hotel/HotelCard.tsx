import { Link } from "react-router-dom";

interface Props {
  hotel: any;
}

const HotelCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/hotel/${hotel.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
    >
      <img
        src={hotel.thumbnail}
        alt={hotel.hotelName}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="font-bold text-xl">
          {hotel.hotelName}
        </h3>

        <p className="text-gray-500 mt-1">
          {hotel.location}
        </p>

        <div className="flex justify-between mt-4">
          <div>
            ⭐ {hotel.rating}
            <span className="text-gray-400 ml-2">
              ({hotel.reviewCount})
            </span>
          </div>

          <div className="font-bold text-blue-600">
            ${hotel.startingPrice}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;