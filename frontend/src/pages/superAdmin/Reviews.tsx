import { useEffect, useState } from "react";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";

import {
  getAllReviews,
  deleteReview,
} from "../../services/review.service";

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews();

      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReview(id);

      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SuperAdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Reviews Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all customer reviews
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            Reviews List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">
                  Customer
                </th>

                <th className="px-6 py-3 text-left">
                  Hotel
                </th>

                <th className="px-6 py-3 text-left">
                  Rating
                </th>

                <th className="px-6 py-3 text-left">
                  Comment
                </th>

                <th className="px-6 py-3 text-left">
                  Date
                </th>

                <th className="px-6 py-3 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {review.user?.fullName}
                  </td>

                  <td className="px-6 py-4">
                    {review.hotel?.hotelName}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                      ⭐ {review.rating}/5
                    </span>
                  </td>

                  <td className="px-6 py-4 max-w-xs">
                    {review.comment || "No comment"}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleDelete(review.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {reviews.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No reviews found
            </div>
          )}
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default Reviews;