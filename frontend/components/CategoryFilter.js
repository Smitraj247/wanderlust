'use client'

const categories = [
  'All',
  'Beachfront',
  'Mountains',
  'City',
  'Countryside',
  'Luxury',
  'Budget',
]

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-4 border-b">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category === 'All' ? '' : category)}
          className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
            (category === 'All' && !selectedCategory) || selectedCategory === category
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
