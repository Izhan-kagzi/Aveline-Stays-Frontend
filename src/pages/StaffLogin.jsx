import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/staff-access/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Store token and user info
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "manager") {
        navigate("/manager/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-white mb-2">Aveline</div>
          <p className="text-gray-400">Staff Access Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Staff Login
          </h1>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@avelinestays.com"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Info Message */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
            <p className="text-xs text-blue-300">
              <strong>Demo Credentials:</strong>
            </p>
            <p className="text-xs text-blue-300 mt-1">
              Admin: admin@avelinestays.com / Admin@123
            </p>
            <p className="text-xs text-blue-300">
              Manager: manager@avelinestays.com / Manager@123
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>This is a secure staff access portal.</p>
          <p>Do not share your credentials with anyone.</p>
        </div>
      </div>
    </div>
  );
}
