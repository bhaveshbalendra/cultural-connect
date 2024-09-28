/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { baseUrl } from "@/constants/baseURL";
import axios from "axios";

const Signup: React.FC = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleGoogleSignupSuccess = (credentialResponse: any) => {
    console.log(credentialResponse);
    // Handle success, for example, send the credential to your backend
  };

  const handleGoogleSignupFailure = () => {
    console.error("Signup failed");
  };

  async function handleSignupUser(e: FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/signup`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>

          <form method="post" className="space-y-4" onSubmit={handleSignupUser}>
            <div>
              <label className="block mb-2 text-sm">Username</label>
              <input
                value={input.username}
                name="username"
                type="text"
                onChange={handleChangeInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                value={input.email}
                name="email"
                onChange={handleChangeInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Password</label>
              <input
                type="password"
                value={input.password}
                name="password"
                onChange={handleChangeInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
            </div>
            {!loading && (
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded-md"
              >
                Sign Up
              </button>
            )}
          </form>

          <div className="mt-4 text-center">
            <GoogleLogin
              onSuccess={handleGoogleSignupSuccess}
              onError={handleGoogleSignupFailure}
            />
          </div>

          <p className="text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
