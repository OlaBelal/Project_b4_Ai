import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation

// Import the images
import travelImage from "../assets/images/image 1.png";
import googleLogo from "../assets/images/google.webp";

// Define interfaces for form data and errors
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

  // Redirect to the login page
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // Handle Google sign-up logic
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
    const newErrors: Errors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 pt-10">
      {/* Left Half: Image */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <img
          src={travelImage} // Use the imported image
          alt="Travel"
          className="max-w-full max-h-full object-cover"
        />
      </div>

      {/* Right Half: Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white pt-8">
        {/* Apply Yesteryear font to "Sign Up" */}
        <h1 className="text-center  mb-2 font-yesteryear text-5xl text-[#DF6951] ">
          Sign Up
        </h1>
        {/* Apply Volkhov font to "Pack your bags and explore the world!" */}
        <p className="text-center mb-5 text-gray-600 text-lg font-volkhov">
          Pack your bags and explore the world!
        </p>
        <form
          className="w-full max-w-[450px]"
          onSubmit={handleSubmit}
        >
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
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors mb-4"
          >
            <img
              src={googleLogo} // Use the imported image
              alt="Google Logo"
              className="w-7 h-7"
            />
            Sign up with Google
          </button>

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