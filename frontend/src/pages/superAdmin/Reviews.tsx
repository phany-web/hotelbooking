import { useEffect, useState } from "react";

import SuperAdminLayout from "../../layouts/SuperAdminLayout";

import ReviewTable from "../../components/review/ReviewTable";

import { getAllReviews, deleteReview } from "../../services/review.service";

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
    if (!confirm("Delete this review?")) return;

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
        <h1 className="text-3xl font-bold">Reviews Management</h1>
      </div>

      <ReviewTable reviews={reviews} onDelete={handleDelete} />
    </SuperAdminLayout>
  );
};

export default Reviews;
