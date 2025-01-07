import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("customers");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:1337/api/${role}?filters[email][$eq]=${email}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      if (data.data.length === 0) {
        setError("Wrong Credentials");
        return;
      }

      const user = data.data[0];
      if (user.password !== password) {
        setError("Incorrect password.");
        return;
      }

      sessionStorage.setItem("user", JSON.stringify(user));

      if (role === "admins") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "An error occurred while logging in.");
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen p-4"
      style={{
        backgroundImage: "url('/background.png'), linear-gradient(135deg, #ffffff 0%, #4caf50 100%)", // Combined gradient and icon background
        backgroundRepeat: "repeat, no-repeat",
        backgroundSize: "500px 500px, cover", // Icon size and cover for gradient
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex items-center mb-6">
          <img
            src="/logo-removebg-preview.png"
            alt="Pick 'N Go Logo"
            className="h-20 w-20 mr-3"
          />
          <a href="/" className="text-4xl font-bold text-green-800 font-serif">
            PICK 'N GO
          </a>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <input
              type="email"
              id="email"
              style={{ fontFamily: 'Cambria, Times New Roman', color: '#000' }}
              className="w-full px-4 py-2 bg-gray-100 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              style={{ fontFamily: 'Cambria, Times New Roman', color: '#000' }}
              className="w-full px-4 py-2 bg-gray-100 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="mb-4">
            <select
              id="role"
              style={{ fontFamily: 'Cambria, Times New Roman', color: '#000' }}
              className="w-full px-4 py-2 bg-gray-100 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customers">Customer</option>
              <option value="admins">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full font-bold py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none"
              style={{ fontFamily: 'Cambria, Times New Roman' }}
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="text-center" style={{ fontFamily: 'Cambria, Times New Roman' }}>
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/reg" className="text-green-600 underline font-bold">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;