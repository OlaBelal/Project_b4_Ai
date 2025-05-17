import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import travelImage2 from "../assets/images/loginbag.jpg";
import { authService } from "../services/authService"; 

interface Errors {
  email?: string;
  password?: string;
}

interface GoogleCredentialResponse {
  credential?: string;
  clientId?: string;
  select_by?: string;
}

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpRedirect = () => {
  
  navigate("/signup", { state: { fromBeforeSignUp: location.pathname } });
};


  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: "Email is required to reset password" });
      return;
    }

    try {
      setIsLoading(true);
      await authService.forgotPassword(formData.email);
      alert(`Password reset instructions sent to ${formData.email}`);
    } catch (error: any) {
      setApiError(error.message || "Failed to send reset instructions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name as keyof Errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!authService.validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include letters, numbers, and special characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setApiError(null);

  if (validateForm()) {
    try {
      setIsLoading(true);
      await authService.login(formData.email, formData.password);

      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else {
        navigate(-1); // ارجع صفحة واحدة للوراء لو مافيش from
      }
    } catch (error: any) {
      setApiError(
        error.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }
};

const handleGoogleLogin = async (credentialResponse: GoogleCredentialResponse) => {
  try {
    setIsLoading(true);

    if (!credentialResponse.credential) {
      throw new Error("No credential received from Google");
    }

    await authService.googleLogin(credentialResponse.credential);

    const redirectPath = location.state?.from?.pathname;
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    } else {
      navigate(-1);
    }
  } catch (error: any) {
    setApiError(error.message || "Google login failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Half: Image */}
      <div className="hidden md:flex flex-1 justify-center items-center bg-white">
        <img
          src={travelImage2}
          alt="Travel"
          className="max-w-full max-h-full object-cover"
        />
      </div>

      {/* Right Half: Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-4">
        <div className="w-full max-w-md">
          <h1 className="text-center mb-2 font-yesteryear text-5xl text-[#DF6951]">
            Log In
          </h1>
          <p className="text-center mb-5 text-gray-600 text-lg font-volkhov">
            Make the world your home
          </p>

          {apiError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {apiError}
            </div>
          )}

          <form className="w-full" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#DF6951]"
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#DF6951]"
                }`}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-right mt-2 text-[#DF6951] hover:text-[#C6533E] text-sm font-medium"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>

            {/* Log In Button */}
            <button
              type="submit"
              className={`w-full py-3 bg-[#DF6951] text-white rounded-lg shadow-md hover:bg-[#C6533E] transition-colors text-lg font-medium mb-4 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Login Button */}
            <div className="mb-6">
              <div
                className={`${
                  isLoading ? "opacity-70 pointer-events-none" : ""
                }`}
              >
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    setApiError("Google login failed. Please try again.");
                  }}
                  width="100%"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  theme="filled_blue"
                  logo_alignment="left"
                />
              </div>
            </div>

            {/* Sign Up Redirect */}
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleSignUpRedirect}
                className="text-[#DF6951] hover:text-[#C6533E] font-bold"
                disabled={isLoading}
              >
                Sign up!
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;