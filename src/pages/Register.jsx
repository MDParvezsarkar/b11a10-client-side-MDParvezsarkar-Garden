import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "../firebase/firebase.config.js";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character."
      );
      return;
    }

    // Firebase user creation
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        });

        // Success message
        toast.success("Registration successful!");
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  };

  // Google login
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Google Login Successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="max-w-lg mt-10 mx-auto p-6 bg-green-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-green-900 mb-4">
        Register
      </h2>

      {/* Error message */}
      {error && (
        <div className="text-error text-xl text-center mb-4">{error}</div>
      )}

      {/* Name */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-green-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-green-300 rounded-lg mt-1"
          placeholder="Enter your name"
          required
        />
      </div>

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

      {/* Photo URL */}
      <div className="mb-4">
        <label
          htmlFor="photoURL"
          className="block text-sm font-medium text-green-700"
        >
          Profile Photo URL
        </label>
        <input
          type="url"
          id="photoURL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full p-2 border border-green-300 rounded-lg mt-1"
          placeholder="Enter a URL for your profile photo"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
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

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-700 text-white text-lg w-full py-2 px-4 rounded-lg hover:bg-green-800"
        >
          Register
        </button>
      </div>

      {/* Google Login Button */}
      <div className="text-center mt-4">
        <button
          onClick={handleGoogleLogin}
          className="bg-green-500 text-white w-full py-2 px-4 rounded-lg hover:bg-green-600"
        >
          SingIn with Google
        </button>
      </div>

      {/* Link to Login */}
      <div className="mt-4 text-center">
        <p className="text-green-500 text-lg">
          Already have an account?{" "}
          <a href="/login" className="text-green-900 font-bold">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
