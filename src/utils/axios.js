import axios from "axios";
const customUrl = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
});

export { customUrl };
