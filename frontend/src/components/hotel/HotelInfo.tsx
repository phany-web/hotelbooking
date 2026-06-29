interface Props {
  hotel: any;
}

const HotelInfo = ({ hotel }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-4xl font-bold">{hotel.hotelName}</h1>

      <div className="mt-4 space-y-2">
        <p>📍 {hotel.location}</p>

        <p>{hotel.address}</p>

        <p>📞 {hotel.phone ?? "N/A"}</p>

        <p>✉️ {hotel.email ?? "N/A"}</p>
      </div>

      <div className="mt-5 flex gap-5">
        <span className="font-semibold">⭐ {hotel.averageRating}</span>

        <span>({hotel.totalReviews} Reviews)</span>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>

        <p className="text-gray-600">{hotel.description}</p>
      </div>
    </div>
  );
};

export default HotelInfo;
