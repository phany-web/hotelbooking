import { useEffect, useMemo, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getMyHotelReviews } from "../../services/review.service";

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const data = await getMyHotelReviews();

      setReviews(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const stats = useMemo(() => {
    const totalReviews = reviews.length;

    const averageRating =
      totalReviews > 0
        ? (
            reviews.reduce(
              (sum, review) => sum + review.rating,
              0
            ) / totalReviews
          ).toFixed(1)
        : "0";

    const fiveStars = reviews.filter(
      (r) => r.rating === 5
    ).length;

    return {
      totalReviews,
      averageRating,
      fiveStars,
    };
  }, [reviews]);

  const getRatingStyle = (rating: number) => {
    if (rating >= 4)
      return "bg-green-100 text-green-700";

    if (rating >= 3)
      return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-center text-slate-500">
          Loading reviews...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Reviews & Ratings
          </h1>

          <p className="text-slate-500 mt-1">
            Monitor customer feedback and ratings
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">
              Total Reviews
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {stats.totalReviews}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">
              Average Rating
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ⭐ {stats.averageRating}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-sm">
              5-Star Reviews
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {stats.fiveStars}
            </h2>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="font-semibold text-lg">
              Customer Reviews
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 text-left">
                    Customer
                  </th>

                  <th className="p-4 text-left">
                    Rating
                  </th>

                  <th className="p-4 text-left">
                    Comment
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {reviews.map(
                  (review: any, index: number) => (
                    <tr
                      key={review.id}
                      className={`hover:bg-slate-50 transition ${
                        index !== reviews.length - 1
                          ? "border-b"
                          : ""
                      }`}
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-slate-800">
                            {review.user?.fullName}
                          </p>
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getRatingStyle(
                            review.rating
                          )}`}
                        >
                          ⭐ {review.rating}/5
                        </span>
                      </td>

                      <td className="p-4 max-w-md">
                        <p className="text-slate-600">
                          {review.comment ||
                            "No comment"}
                        </p>
                      </td>

                      <td className="p-4 text-slate-500">
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {reviews.length === 0 && (
              <div className="py-16 text-center">
                <div className="text-5xl mb-3">
                  ⭐
                </div>

                <h3 className="font-semibold text-lg">
                  No Reviews Yet
                </h3>

                <p className="text-slate-500 mt-1">
                  Customer reviews will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reviews;