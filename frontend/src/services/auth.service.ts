import api from "./axios";
import axios from "./axios";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const registerUser = async (
  data: {
    name: string;
    email: string;
    password: string;
  }
) => {
  return axios.post("/auth/register", data);
};