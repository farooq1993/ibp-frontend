import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom"; // Import navigation
import Logo from "../assets/coat_of_arms.png";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate(); // React Router hook for navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to store validation errors

  // Redirect logged-in users away from login page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect if already logged in
    }
  }, [isAuthenticated, navigate]);

  // Validation Function
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post(
        "https://farooqa.pythonanywhere.com/user/user_login",
        { email, password }
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        login(token, user); // Store in localStorage
        navigate("/"); // Redirect to dashboard
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "Login failed, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const buttonStyles = {
    padding: "5px 15px",
    backgroundColor: "rgb(255, 217, 151)",
    color: "black",
    "&:hover": {
      backgroundColor: "rgb(255, 217, 151)",
    },
    "&:active": {
      backgroundColor: "rgba(255, 217, 151, 0.7)",
    },
    transition: "background-color 0.2s ease",
  };
  return (
    <div
      className="ibp-login w-full min-h-screen flex
"
    >
      <div className="flex items-start justify-center bg-[#d0bc9b] w-1/3">
        <img className="p-14" src={Logo} alt="Logo" />
      </div>
      <div className="flex justify-between flex-col items-start log-in px-10 py-20 w-2/3 bg-[#fefefe]">
        <form className="w-full" autoComplete="off" onSubmit={handleSubmit}>
          <h4 className="mb-5 color-[#00000080] font-bold">
            <span>Integrated Bank of Projects</span>
          </h4>
          <div className="floating-label">
            <input
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
            <div className="icon">
              <svg
                enableBackground="new 0 0 100 100"
                version="1.1"
                viewBox="0 0 100 100"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style type="text/css">{`.st0{fill:none;}`}</style>
                <g transform="translate(0 -952.36)">
                  <path d="m17.5 977c-1.3 0-2.4 1.1-2.4 2.4v45.9c0 1.3 1.1 2.4 2.4 2.4h64.9c1.3 0 2.4-1.1 2.4-2.4v-45.9c0-1.3-1.1-2.4-2.4-2.4h-64.9zm2.4 4.8h60.2v1.2l-30.1 22-30.1-22v-1.2zm0 7l28.7 21c0.8 0.6 2 0.6 2.8 0l28.7-21v34.1h-60.2v-34.1z" />
                </g>
                <rect className="st0" width="100" height="100" />
              </svg>
            </div>
          </div>
          <div className="floating-label">
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            <div className="icon">
              <svg
                enableBackground="new 0 0 24 24"
                version="1.1"
                viewBox="0 0 24 24"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style type="text/css">{`.st0{fill:none;} .st1{fill:#010101;}`}</style>
                <rect className="st0" width="24" height="24" />
                <path className="st1" d="M19,21H5V9h14V21z M6,20h12V10H6V20z" />
                <path
                  className="st1"
                  d="M16.5,10h-1V7c0-1.9-1.6-3.5-3.5-3.5S8.5,5.1,8.5,7v3h-1V7c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5V10z"
                />
                <path
                  className="st1"
                  d="m12 16.5c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5zm0-2c-0.3 0-0.5 0.2-0.5 0.5s0.2 0.5 0.5 0.5 0.5-0.2 0.5-0.5-0.2-0.5-0.5-0.5z"
                />
              </svg>
            </div>
          </div>
          {/* Error Message for Login API Errors */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button
            sx={{ marginTop: "20px", float: "right" }}
            type="submit"
            style={buttonStyles}
            disabled={loading}
          >
            {loading ? "Logging in" : "Log in"}
            {loading && <CircularProgress size={15} sx={{ color: "#b33505", marginLeft:"5px" }} />}
          </Button>
        </form>
        <p className="p-5">
          Copyright © 2019 - 2025, Ministry of Finance, Planning and Economic
          Development
        </p>
      </div>
    </div>
  );
};

export default Login;
