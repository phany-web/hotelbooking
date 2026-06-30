import api from "./axios";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/register", data);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};
