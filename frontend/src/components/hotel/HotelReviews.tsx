import type { Review } from "../../types/hotel.types";

interface Props {
  reviews: Review[];
}

const HotelReviews = ({ reviews }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>

      {reviews.length === 0 && (
        <div className="text-center text-gray-500 py-10">No reviews yet.</div>
      )}

      <div className="space-y-5">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-5">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{review.user.fullName}</h3>

                <p className="text-sm text-gray-500">⭐ {review.rating}/5</p>
              </div>
            </div>

            <p className="mt-3 text-gray-700">
              {review.comment || "No comment"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelReviews;
