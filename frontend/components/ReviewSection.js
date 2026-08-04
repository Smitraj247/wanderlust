export default function ReviewSection({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Be the first to review!
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review._id} className="border-b pb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-semibold">
                {review.author?.username || 'Anonymous'}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-yellow-500">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </span>
                <span>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
