import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, // must be defined in your .env file
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Get all auction items
export const getItems = () => api.get("/items").then((r) => r.data);

// ✅ Get single auction item by ID
export const getItem = (id: number) =>
  api.get(`/items/${id}`).then((r) => r.data);

// ✅ Create a new auction item
export const createItem = (data: {
  name: string;
  description: string;
  startPrice: number;
  durationSeconds: number;
}) => api.post("/items", data).then((r) => r.data);

// ✅ Place a bid on an item
export const placeBid = (data: {
  itemId: number;
  userId: number;
  amount: number;
}) => api.post("/bids", data).then((r) => r.data);

// ✅ Get all items the user has placed bids on
export const getMyBids = (userId: number) =>
  api.get(`/users/${userId}/bids`).then((r) => r.data);
