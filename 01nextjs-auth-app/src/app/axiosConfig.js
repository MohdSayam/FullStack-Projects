import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "", // same origin (Next.js API routes)
  withCredentials: true, //  important: send cookies with every request
});

export default api;
