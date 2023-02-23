import axios from "axios";
const customUrl = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  
});

export { customUrl };
