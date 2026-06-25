import { useEffect, useState } from "react";

import { getHotelReviews, getHotelRating } from "../../services/review.service";

import ReviewCard from "../../components/review/ReviewCard";

interface Props {
  hotelId: string;
}

const HotelReviews = ({ hotelId }: Props) => {
  const [reviews, setReviews] = useState<any[]>([]);

  const [rating, setRating] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const reviewData = await getHotelReviews(hotelId);

      const ratingData = await getHotelRating(hotelId);

      setReviews(reviewData);

      setRating(ratingData);
    };

    load();
  }, [hotelId]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Reviews</h2>

        <p>
          ⭐ {rating?.averageRating?.toFixed(1) || 0}
          /5 ({rating?.totalReviews || 0}
          reviews)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default HotelReviews;
