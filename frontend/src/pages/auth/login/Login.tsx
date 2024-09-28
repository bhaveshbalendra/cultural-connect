/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { baseUrl } from "@/constants/baseURL";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice/authSlice";

const Login: React.FC = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;
      if (credential) {
        // Send the credential to your backend for further authentication
        const res = await axios.post(`${baseUrl}/google-signin`, {
          token: credential,
        });

        if (res.data.success) {
          navigation("/");
          toast.success("Login successful with Google");
        }
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google login failed, please try again.");
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google login failed");
    toast.error("Google login failed, please try again.");
  };

  async function handleSigninUser(e: FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(`${baseUrl}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigation("/");
        setInput({
          email: "",
          password: "",
        });
        toast.success(res.data.message);
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form className="space-y-4" method="post" onSubmit={handleSigninUser}>
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                value={input.email}
                name="email"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Password</label>
              <input
                type="password"
                value={input.password}
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>
            {!loading ? (
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded-md"
              >
                Login
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded-md opacity-50 cursor-not-allowed"
                disabled
              >
                Logging in...
              </button>
            )}
          </form>

          <div className="mt-4 text-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </div>

          <p className="text-center">
            Don't have an account?
            <a href="/signup" className="text-blue-600">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
