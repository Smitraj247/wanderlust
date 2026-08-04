# Wanderlust Frontend

Modern Next.js frontend for Wanderlust travel booking platform.

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **SWR** - Data fetching (optional)

## 📂 Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.js           # Root layout
│   ├── page.js             # Homepage
│   ├── globals.css         # Global styles
│   ├── listings/           # Listings pages
│   │   ├── page.js         # Listings index
│   │   ├── new/page.js     # Create listing
│   │   └── [id]/page.js    # Listing details
│   ├── login/page.js       # Login
│   ├── signup/page.js      # Signup
│   ├── wishlist/page.js    # Wishlist
│   └── cart/page.js        # Cart
├── components/             # Reusable components
│   ├── Navbar.js
│   ├── Footer.js
│   ├── ListingCard.js
│   ├── SearchBar.js
│   ├── CategoryFilter.js
│   ├── ReviewForm.js
│   └── ReviewSection.js
├── lib/                    # Utilities
│   └── api.js              # API functions
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind config
├── next.config.js          # Next.js config
└── package.json            # Dependencies
```

## ⚙️ Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 3. Start Development Server
```bash
npm run dev
```

Frontend runs on **http://localhost:3000**

### 4. Build for Production
```bash
npm run build
npm start
```

## 🎨 Features

### Pages
- ✅ **Homepage** - Search and browse listings
- ✅ **Listings** - View all properties with filters
- ✅ **Listing Details** - Property info, reviews, booking
- ✅ **Create Listing** - Add new property
- ✅ **Login/Signup** - User authentication
- ✅ **Wishlist** - Saved favorites
- ✅ **Cart** - Booking cart

### Components
- ✅ **Navbar** - Navigation with auth state
- ✅ **Footer** - Site footer
- ✅ **ListingCard** - Property display card
- ✅ **SearchBar** - Search functionality
- ✅ **CategoryFilter** - Filter by category
- ✅ **ReviewForm** - Submit reviews
- ✅ **ReviewSection** - Display reviews

## 🔌 API Integration

All API calls are centralized in `lib/api.js`:

```javascript
import { fetchListings, createListing } from '@/lib/api'

// Fetch listings
const listings = await fetchListings({ q: 'beach', category: 'Beachfront' })

// Create listing
await createListing(formData)
```

## 🎨 Styling

Using Tailwind CSS with custom utilities:

```javascript
// Custom classes in globals.css
.btn-primary    // Primary button
.btn-secondary  // Secondary button
.card           // Card container
.input-field    // Form input
.label          // Form label
```

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly UI
- Optimized images

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
```bash
# Build production bundle
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### next.config.js
```javascript
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
}
```

### tailwind.config.js
```javascript
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#fe424d',
      },
    },
  },
}
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## ⚠️ Important Notes

1. **Backend Required**: Frontend needs backend running on port 8080
2. **CORS**: Backend must allow localhost:3000
3. **Images**: Cloudinary domains must be configured
4. **Auth**: Session-based authentication with cookies

## 🐛 Troubleshooting

### API Connection Issues
- Verify backend is running on port 8080
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure CORS is configured in backend

### Image Loading Issues
- Add Cloudinary domain to `next.config.js`
- Check image URLs are valid

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run dev
```

---

**Happy Coding! 🚀**
