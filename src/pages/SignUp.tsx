// src/pages/SignUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import travelImage from "../assets/images/image 1.png";
import { authService } from "../services/authService";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!authService.validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include both letters and numbers.";
    }
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);
    
    if (validateForm()) {
      try {
        await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        navigate("/dashboard");
      } catch (error: any) {
        setApiError(error.message || "Registration failed");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 pt-10">
      {/* Left Half: Image */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <img
          src={travelImage}
          alt="Travel"
          className="max-w-full max-h-full object-cover"
        />
      </div>

      {/* Right Half: Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white pt-8">
        <h1 className="text-center mb-2 font-yesteryear text-5xl text-[#DF6951]">
          Sign Up
        </h1>
        <p className="text-center mb-5 text-gray-600 text-lg font-volkhov">
          Pack your bags and explore the world!
        </p>
        
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {apiError}
          </div>
        )}
        
        <form className="w-full max-w-[450px]" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-2 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#DF6951] shadow-sm"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-2 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#DF6951] shadow-sm"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-2 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#DF6951] shadow-sm"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-2 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#DF6951] shadow-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#DF6951] text-white rounded-lg shadow-md hover:bg-[#C6533E] transition-colors text-xl mb-4"
          >
            Sign Up
          </button>

          {/* Google Sign Up Button */}
          <div className="mb-4 w-full">
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log("Google SignUp Success:", credentialResponse);
                  navigate("/dashboard");
                }}
                onError={() => {
                  console.log("Google SignUp Failed");
                }}
                width="100%"
                size="large"
                text="signup_with"
              />
            </GoogleOAuthProvider>
          </div>

          {/* Login Redirect */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              className="text-[#DF6951] cursor-pointer font-bold"
              onClick={handleLoginRedirect}
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;