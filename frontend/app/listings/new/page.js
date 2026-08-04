'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createListing } from '@/lib/api'

export default function NewListingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    country: '',
    category: 'Beachfront',
  })
  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      data.append('listing[title]', formData.title)
      data.append('listing[description]', formData.description)
      data.append('listing[price]', formData.price)
      data.append('listing[location]', formData.location)
      data.append('listing[country]', formData.country)
      data.append('listing[category]', formData.category)
      if (image) {
        data.append('listing[image][url]', image)
      }

      await createListing(data)
      router.push('/listings')
    } catch (error) {
      console.error('Failed to create listing:', error)
      alert('Failed to create listing')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Create New Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Price (per night)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input-field"
              min="0"
              required
            />
          </div>

          <div>
            <label className="label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option>Beachfront</option>
              <option>Mountains</option>
              <option>City</option>
              <option>Countryside</option>
              <option>Luxury</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="label">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div>
          <label className="label">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="input-field"
            accept="image/*"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
