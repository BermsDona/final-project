import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customers");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const jsonData = {
      data: {
        name: name,
        email: email,
        password: password,
      }
    };
    const jsonString = JSON.stringify(jsonData);
    try {
      const response = await fetch(`http://localhost:1337/api/${role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });
      if (response.ok) {
        alert("Registration successful!");
        navigate("/");
      } else {
        const errorData = await response.text();
        alert("Registration failed!");
        console.error(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering!");
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen p-4"
      style={{
        backgroundImage: "url('/background.png'), linear-gradient(135deg, #ffffff 0%, #4caf50 100%)", // Combined gradient and icon background
        backgroundRepeat: "repeat, no-repeat", // Repeat for icons, no repeat for gradient
        backgroundSize: "500px 500px, cover", // Icon size and cover for gradient
      }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex items-center mb-6">
          <img
            src="/logo-removebg-preview.png"
            alt="Pick 'N Go Logo"
            className="h-20 w-20 mr-3" // Increased logo size
          />
          <a href="/" className="text-4xl font-bold text-green-800 font-serif">
            PICK 'N GO
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              style={{ fontFamily: 'Cambria, Times New Roman', color: '#000' }} // Inline style for input font
              className="w-full px-4 py-2 bg-white border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              style={{ fontFamily: 'Cambria, Times New Roman', color: '#000' }} // Inline style for input font
              className="w-full px-4 py-2 bg-white border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              style={{ fontFamily: 'Cambria, Times New Roman', color: '#000' }} // Inline style for input font
              className="w-full px-4 py-2 bg-white border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              style={{ fontFamily: 'Cambria, Times New Roman', color: '#000' }} // Inline style for input font
              className="w-full px-4 py-2 bg-white border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="mb-4">
            <select
              id="role"
              style={{ fontFamily: 'Cambria, Times New Roman', color: '#000' }} // Inline style for select font
              className="w-full py-2 px-4 bg-white border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
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
              className="w-full font-bold py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none transition duration-200"
              style={{ fontFamily: 'Cambria, Times New Roman' }} // Inline style for button font
            >
              Register
            </button>
          </div>

          <div className="text-center mt-4" style={{ fontFamily: 'Cambria, Times New Roman' }}> {/* Inline style for text */}
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-green-600 underline font-bold">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;