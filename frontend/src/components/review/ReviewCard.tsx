interface Props {
  review: any;
}

const ReviewCard = ({ review }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-bold">{review.user?.fullName}</h3>

      <div className="text-yellow-500">{"⭐".repeat(review.rating)}</div>

      <p className="mt-2 text-gray-600">{review.comment}</p>

      <p className="text-sm text-gray-400 mt-3">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;
