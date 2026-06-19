export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}
