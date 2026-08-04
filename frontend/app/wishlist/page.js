'use client'

import { useEffect, useState } from 'react'
import ListingCard from '@/components/ListingCard'
import { fetchWishlist } from '@/lib/api'

export default function WishlistPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      const data = await fetchWishlist()
      setListings(data)
    } catch (error) {
      console.error('Failed to load wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card h-80 animate-pulse bg-gray-200" />
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl text-gray-600 mb-4">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-8">Start adding places you love</p>
          <a href="/listings" className="btn-primary">
            Explore Listings
          </a>
        </div>
      )}
    </div>
  )
}
