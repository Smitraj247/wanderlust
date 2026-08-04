"use client";

import { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { fetchListings } from "@/lib/api";

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadListings();
  }, [searchQuery, category]);

  const loadListings = async () => {
    setLoading(true);
    try {
      const result = await fetchListings({ q: searchQuery, category });
      setListings(result.data); // extract the array
    } catch (error) {
      console.error("Failed to load listings:", error);
      setListings([]); // fallback so .map never crashes on error either
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* <h1 className="text-4xl font-bold mb-4">All Listings</h1> */}
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <CategoryFilter
        selectedCategory={category}
        onSelectCategory={setCategory}
      />

      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="card h-80 animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
