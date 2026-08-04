'use client'

import { useEffect, useState } from 'react'
import ListingCard from '@/components/ListingCard'
import { fetchCart } from '@/lib/api'

export default function CartPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      const data = await fetchCart()
      setListings(data)
    } catch (error) {
      console.error('Failed to load cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = listings.reduce((sum, listing) => sum + listing.price, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Cart</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card h-80 animate-pulse bg-gray-200" />
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-semibold">{listings.length}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-3">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <button className="btn-primary w-full">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl text-gray-600 mb-4">Your cart is empty</h3>
          <p className="text-gray-500 mb-8">Add listings to start booking</p>
          <a href="/listings" className="btn-primary">
            Explore Listings
          </a>
        </div>
      )}
    </div>
  )
}
