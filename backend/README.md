# Wanderlust Backend

Express.js backend API for Wanderlust travel booking platform.

## 📂 Structure

```
backend/
├── admin/              # Admin module
│   ├── controllers/    # Admin business logic
│   └── routes/         # Admin route definitions
├── config/             # Configuration files
│   ├── cloudinary.js   # Cloudinary setup
│   ├── db.js           # Database connection
│   ├── passport.js     # Auth strategy config
│   └── session.js      # Session config
├── controllers/        # Business logic
├── middleware/         # Custom middleware
│   ├── auth.js         # Authentication
│   ├── authorization.js # Authorization
│   ├── errorHandler.js # Error handling
│   └── validation.js   # Input validation
├── models/             # Mongoose schemas
├── routes/             # API routes
├── utils/              # Helper functions
├── init/               # Database seed
└── app.js              # Main entry point
```

## 🚀 Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. Start server:
   ```bash
   npm start      # Production
   npm run dev    # Development with nodemon
   ```

## 🔧 Environment Variables

See `.env.example` for required variables.
