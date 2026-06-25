import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getMyHotelReviews } from "../../services/review.service";

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const data = await getMyHotelReviews();

    setReviews(data);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Hotel Reviews</h1>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Rating</th>

              <th className="p-4 text-left">Comment</th>

              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b">
                <td className="p-4">{review.user.fullName}</td>

                <td className="p-4">⭐ {review.rating}/5</td>

                <td className="p-4">{review.comment}</td>

                <td className="p-4">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Reviews;
