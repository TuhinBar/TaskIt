import axios from "./axios";

export const fetchOwnerLocal = () => {
  if (typeof window === "undefined") {
    return null;
  } else {
    const user = localStorage.getItem("user") || "null";
    if (user === "null" || user === null || user === "undefined") {
      return null;
    }
    return JSON.parse(user);
    // const {data} = await axios.get("/auth/user")
    // return data;
  }
};
