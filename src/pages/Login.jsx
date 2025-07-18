import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "../firebase/firebase.config";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //  Handle Email/Password Login
  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in user:", user);
        toast.success("Login successful!");
        navigate("/");
      })

      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  };

  //  Handle Google Login
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google user:", user);
        toast.success("Google Login Successful");
        navigate("/");
      })

      .catch((error) => {
        toast.error(error.message);
      });
  };

  //  Handle Password Reset
  const handleForgotPassword = () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-green-100 rounded-lg shadow-md">
      <h2 className="text-2xl text-green-900 font-bold text-center mb-4">Login</h2>

      {error && <div className="text-error mb-4">{error}</div>}

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-green-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-green-300 rounded-lg mt-1"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-green-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-green-300 rounded-lg mt-1"
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Forgot Password */}
      <div className="mb-4 text-right">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-green-500 text-sm font-bold hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-700 text-white py-2 px-4 w-full text-lg font-bold rounded-lg hover:bg-green-800"
        >
          Login
        </button>
      </div>

      {/* Google Login */}
      <div className="text-center mt-4">
        <button
          onClick={handleGoogleLogin}
          className="bg-green-500 text-white text-lg font-bold w-full py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Login with Google
        </button>
      </div>

      {/* Link to Register */}
      <div className="mt-4 text-center">
        <p className="text-lg text-green-500">
          Don't have an account?{" "}
          <a href="/register" className="text-green-900 font-bold">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
