import axios from "axios";

const API = axios.create({
  baseURL: "https://crm-backend-2rkm.onrender.com",
});

export default API;