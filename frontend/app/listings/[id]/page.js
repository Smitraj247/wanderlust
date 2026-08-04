"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchListingById } from "@/lib/api";
import ReviewSection from "@/components/ReviewSection";
import ReviewForm from "@/components/ReviewForm";

export default function ListingDetailPage() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListing();
  }, [params.id]);

  const loadListing = async () => {
    try {
      const result = await fetchListingById(params.id);
      setListing(result.data); // unwrap it
    } catch (error) {
      console.error("Failed to load listing:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-xl mb-8" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-600">Listing not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Image */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-8">
        <Image
          src={listing.image?.url || "/placeholder.jpg"}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{listing.title}</h1>
          <p className="text-gray-600 mb-4">
            {listing.location}, {listing.country}
          </p>
          <div className="mb-4">
            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm">
              {listing.category}
            </span>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">
            {listing.description}
          </p>

          {/* Reviews Section */}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            <ReviewForm listingId={listing._id} onReviewAdded={loadListing} />
            <ReviewSection reviews={listing.reviews || []} />
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-4">
            <div className="mb-4">
              <span className="text-3xl font-bold">${listing.price}</span>
              <span className="text-gray-600"> / night</span>
            </div>

            <button className="btn-primary w-full mb-3">Reserve</button>
            <button className="btn-secondary w-full mb-3">
              Add to Wishlist
            </button>
            <button
              className="btn-secondary w-full"
              useRef="/cart"
              onClick={() => {
                alert("Added to cart!");
              }}
            >
              Add to Cart
            </button>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-2">Hosted by</h3>
              <p className="text-gray-600">
                {listing.owner?.username || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
