import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(email, password);
      const authData = response.data;

      const role = authData.user.role.roleName;

      localStorage.setItem("refreshToken", authData.refreshToken);

      setAuth(authData.accessToken, role, {
        id: authData.user.id,
        fullName: authData.user.fullName,
        email: authData.user.email,
        role,
        hotelId: authData.user.hotelId,
      });

      switch (role) {
        case "SUPER_ADMIN":
          navigate("/super-admin");
          break;
        case "ADMIN":
          navigate("/admin");
          break;
        case "STAFF":
          navigate("/staff");
          break;
        default:
          navigate("/");
      }
    } catch (error: any) {
      console.log(error?.response?.data);
      alert(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;