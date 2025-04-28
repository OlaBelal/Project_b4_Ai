// src/pages/LogIn.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import travelImage2 from "../assets/images/loginbag.jpg";
import { authService } from "../services/authService";

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
  
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({...errors, email: "Email is required to reset password"});
      return;
    }

    try {
      await authService.forgotPassword(formData.email);
      alert(`Password reset instructions sent to ${formData.email}`);
    } catch (error: any) {
      setApiError(error.message || "Failed to send reset instructions");
    }
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

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!authService.validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include both letters and numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);
    
    if (validateForm()) {
      try {
        await authService.login(formData.email, formData.password);
        navigate("/dashboard");
      } catch (error: any) {
        setApiError(error.message || "Login failed");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Half: Image */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <img
          src={travelImage2}
          alt="Travel"
          className="max-w-full max-h-full object-cover"
        />
      </div>

      {/* Right Half: Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <h1 className="text-center mb-2 font-yesteryear text-5xl text-[#DF6951]">
          Log In
        </h1>
        <p className="text-center mb-5 text-gray-600 text-lg font-volkhov">
          Make the world your home
        </p>
        
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {apiError}
          </div>
        )}
        
        <form className="w-full max-w-[450px]" onSubmit={handleSubmit}>
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
            <p
              className="text-right mt-2 text-[#DF6951] cursor-pointer text-sm"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </p>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#DF6951] text-white rounded-lg shadow-md hover:bg-[#C6533E] transition-colors text-xl mb-4"
          >
            Log In
          </button>

          {/* Google Login Button */}
          <div className="mb-4 w-full">
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log("Google Login Success:", credentialResponse);
                  navigate("/dashboard");
                }}
                onError={() => {
                  console.log("Google Login Failed");
                }}
                width="100%"
                size="large"
                text="continue_with"
              />
            </GoogleOAuthProvider>
          </div>

          {/* Sign Up Redirect */}
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <span
              className="text-[#DF6951] cursor-pointer font-bold"
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