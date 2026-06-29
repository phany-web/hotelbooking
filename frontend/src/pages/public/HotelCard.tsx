import { Link } from "react-router-dom";

interface Props {
  hotel: any;
}

const HotelCard = ({ hotel }: Props) => {
  const image =
    hotel.images?.[0]?.imageUrl ??
    "https://placehold.co/600x400?text=Hotel";

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <img
        src={image}
        className="h-56 w-full object-cover"
        alt={hotel.hotelName}
      />

      <div className="p-5">

        <h3 className="text-xl font-bold">
          {hotel.hotelName}
        </h3>

        <p className="text-gray-500">
          {hotel.location}
        </p>

        <div className="flex justify-between mt-4">

          <span>
            ⭐ {hotel.averageRating}
          </span>

          <Link
            to={`/hotel/${hotel.id}`}
            className="text-blue-600 font-semibold"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
};

export default HotelCard;