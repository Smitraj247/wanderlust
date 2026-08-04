'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import { fetchListings } from '@/lib/api'

export default function HomePage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    loadListings()
  }, [searchQuery, category])

  const loadListings = async () => {
    setLoading(true)
    try {
      const data = await fetchListings({ q: searchQuery, category })
      setListings(data)
    } catch (error) {
      console.error('Failed to load listings:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Find Your Perfect Stay
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover unique homes and experiences around the world
        </p>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Category Filter */}
      <CategoryFilter 
        selectedCategory={category} 
        onSelectCategory={setCategory} 
      />

      {/* Listings Grid */}
      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
            <h3 className="text-2xl text-gray-600 mb-4">No listings found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
