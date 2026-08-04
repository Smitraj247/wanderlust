const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Beachfront",
  },
  {
    title: "Modern Loft in the Heart of the City",
    description:
      "Stay in this stylish loft apartment just steps away from downtown attractions, restaurants, and nightlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York",
    country: "United States",
    category: "City",
  },
  {
    title: "Rustic Cabin Retreat",
    description:
      "Unplug and unwind in this rustic cabin surrounded by pine forest, perfect for a peaceful mountain escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Aspen",
    country: "United States",
    category: "Mountains",
  },
  {
    title: "Charming Countryside Farmhouse",
    description:
      "Experience rural life at this restored farmhouse, complete with a garden, farm animals, and rolling hills.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Provence",
    country: "France",
    category: "Countryside",
  },
  {
    title: "Luxury Villa with Private Pool",
    description:
      "Indulge in this luxury villa featuring a private infinity pool, breathtaking sea views, and premium amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Santorini",
    country: "Greece",
    category: "Luxury",
  },
  {
    title: "Traditional Japanese Ryokan",
    description:
      "Immerse yourself in Japanese culture with a stay at this traditional ryokan, featuring tatami rooms and a private onsen.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Kyoto",
    country: "Japan",
    category: "Trending",
  },
  {
    title: "Desert Glamping Tent",
    description:
      "Sleep under the stars in this luxury glamping tent, complete with plush bedding and panoramic desert views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=800&q=60",
    },
    price: 700,
    location: "Sahara Desert",
    country: "Morocco",
    category: "Camping",
  },
  {
    title: "Alpine Ski Chalet",
    description:
      "Hit the slopes right outside your door at this cozy ski chalet, featuring a fireplace and mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518602164578-cd0074062767?auto=format&fit=crop&w=800&q=60",
    },
    price: 2100,
    location: "Zermatt",
    country: "Switzerland",
    category: "Mountains",
  },
  {
    title: "Tropical Overwater Bungalow",
    description:
      "Wake up to turquoise waters at this overwater bungalow, complete with a private deck and direct lagoon access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Bora Bora",
    country: "French Polynesia",
    category: "Beachfront",
  },
  {
    title: "Historic Downtown Apartment",
    description:
      "Stay in a beautifully restored historic building right in the heart of the old town, near cafes and landmarks.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Prague",
    country: "Czech Republic",
    category: "City",
  },
  {
    title: "Lakeside Log Cabin",
    description:
      "Relax by the water at this charming log cabin with a private dock, canoe access, and forest surroundings.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Countryside",
  },
  {
    title: "Minimalist Beach House",
    description:
      "A sleek, modern beach house with floor-to-ceiling windows and direct access to a quiet stretch of coastline.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
    },
    price: 1750,
    location: "Byron Bay",
    country: "Australia",
    category: "Beachfront",
  },
  {
    title: "Boutique City Penthouse",
    description:
      "Take in skyline views from this designer penthouse featuring a rooftop terrace and premium finishes throughout.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
    },
    price: 2400,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Luxury",
  },
  {
    title: "Cliffside Villa with Ocean View",
    description:
      "Perched on a cliff with sweeping ocean views, this villa offers a private terrace and infinity pool for two.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Amalfi Coast",
    country: "Italy",
    category: "Trending",
  },
  {
    title: "Countryside Vineyard Cottage",
    description:
      "Stay among the vines at this cozy cottage on a working vineyard, with wine tastings available on-site.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    },
    price: 1050,
    location: "Napa Valley",
    country: "United States",
    category: "Countryside",
  },
];

module.exports = { data: sampleListings };
