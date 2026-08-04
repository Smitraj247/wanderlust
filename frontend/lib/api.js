import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Listings
export const fetchListings = async (params = {}) => {
  const response = await api.get("/listings", { params });
  return response.data;
};

export const fetchListingById = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data;
};

export const createListing = async (formData) => {
  const response = await api.post("/listings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateListing = async (id, formData) => {
  const response = await api.put(`/listings/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteListing = async (id) => {
  const response = await api.delete(`/listings/${id}`);
  return response.data;
};

// Reviews
export const createReview = async (listingId, reviewData) => {
  const response = await api.post(`/listings/${listingId}/reviews`, reviewData);
  return response.data;
};

export const deleteReview = async (listingId, reviewId) => {
  const response = await api.delete(
    `/listings/${listingId}/reviews/${reviewId}`,
  );
  return response.data;
};

// Auth
export const signup = async (userData) => {
  const response = await api.post("/signup", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.get("/logout");
  return response.data;
};

// Wishlist
export const fetchWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

export const addToWishlist = async (listingId) => {
  const response = await api.post(`/wishlist/${listingId}`);
  return response.data;
};

export const removeFromWishlist = async (listingId) => {
  const response = await api.delete(`/wishlist/${listingId}`);
  return response.data;
};

// Cart
export const fetchCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (listingId) => {
  const response = await api.post(`/cart/${listingId}`);
  return response.data;
};

export const removeFromCart = async (listingId) => {
  const response = await api.delete(`/cart/${listingId}`);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

export default api;
