import Link from 'next/link'
import Image from 'next/image'

export default function ListingCard({ listing }) {
  return (
    <Link href={`/listings/${listing._id}`}>
      <div className="card overflow-hidden cursor-pointer">
        <div className="relative h-48">
          <Image
            src={listing.image?.url || '/placeholder.jpg'}
            alt={listing.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold">
            ${listing.price}/night
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {listing.category}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">
            {listing.location}, {listing.country}
          </p>
          
          <p className="text-gray-500 text-sm line-clamp-2">
            {listing.description}
          </p>

          {listing.reviews && listing.reviews.length > 0 && (
            <div className="mt-3 flex items-center text-sm text-gray-600">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{listing.reviews.length} reviews</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
