import axios_ from "axios";
import { BACKEND_URL } from "../Constants";

const axios = axios_.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axios;
