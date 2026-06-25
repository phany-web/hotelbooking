interface Props {
  reviews: any[];
  onDelete: (id: string) => void;
}

const ReviewTable = ({ reviews, onDelete }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Customer</th>

            <th className="p-4 text-left">Hotel</th>

            <th className="p-4 text-left">Rating</th>

            <th className="p-4 text-left">Comment</th>

            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="p-4">{review.user?.fullName}</td>

              <td className="p-4">{review.hotel?.hotelName}</td>

              <td className="p-4">⭐ {review.rating}</td>

              <td className="p-4">{review.comment}</td>

              <td className="p-4">
                <button
                  onClick={() => onDelete(review.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reviews.length === 0 && (
        <div className="text-center p-10">No Reviews Found</div>
      )}
    </div>
  );
};

export default ReviewTable;
