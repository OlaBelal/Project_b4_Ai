import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation


import travelImage2 from "../assets/images/loginbag.jpg";
import googleLogo from "../assets/images/google.webp"; 

// Define the Errors type
interface Errors {
  email?: string;
  password?: string;
}

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({}); // Apply the Errors type

  // Redirect to the Sign Up page
  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  // Handle Forgot Password logic
  const handleForgotPassword = () => {
    console.log("Forgot Password clicked");
  };

  // Handle Google Sign Up logic
  const handleGoogleSignUp = () => {
    console.log("Sign up with Google");
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate password strength
  const validatePassword = (password: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return password.length >= 8 && hasLetter && hasNumber;
  };

  // Validate the entire form
  const validateForm = (): boolean => {
    const newErrors: Errors = {}; // Use the Errors type

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include both letters and numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Left Half: Image */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <img
          src={travelImage2}
          alt="Travel"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Right Half: Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontFamily: "'Yesteryear', cursive",
            fontSize: "48px",
            color: "#DF6951",
          }}
        >
          Log In
        </h1>
        <p style={{ textAlign: "center", marginBottom: "20px", color: "#666", fontSize: "18px", fontFamily: "Volkhov" }}>
          Make the world your home
        </p>
        <form
          style={{
            width: "100%",
            maxWidth: "450px",
          }}
          onSubmit={handleSubmit}
        >
          {/* Email Field */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "9px" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "none",
                borderBottom: "2px solid #ccc",
                backgroundColor: "transparent",
                boxSizing: "border-box",
                fontSize: "14px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            {errors.email && <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "9px" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "none",
                borderBottom: "2px solid #ccc",
                backgroundColor: "transparent",
                boxSizing: "border-box",
                fontSize: "14px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            {errors.password && <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.password}</p>}
            <p
              style={{
                textAlign: "right",
                marginTop: "10px",
                color: "#DF6951",
                cursor: "pointer",
                fontSize: "15px",
              }}
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </p>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#DF6951",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "22px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginBottom: "15px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => ((e.target as HTMLElement).style.backgroundColor = "#C6533E")}
            onMouseOut={(e) => ((e.target as HTMLElement).style.backgroundColor = "#DF6951")}
          >
            Log In
          </button>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#fff",
              color: "#333",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "15px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => ((e.target as HTMLElement).style.backgroundColor = "#f0f0f0")}
            onMouseOut={(e) => ((e.target as HTMLElement).style.backgroundColor = "#fff")}
          >
            <img
              src={googleLogo}
              alt="Google Logo"
              style={{ width: "30px", height: "30px" }}
            />
            Log in with Google
          </button>

          {/* Sign Up Redirect */}
          <p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
            Don’t have an account?{" "}
            <span
              style={{ color: "#DF6951", cursor: "pointer", fontWeight: "bold" }}
              onClick={handleSignUpRedirect}
            >
              Sign up!
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;