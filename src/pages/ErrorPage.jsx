import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../assets/lottie/error.json"; 

const ErrorPage = ({ message = "Oops! Something went wrong." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <div className="w-64 h-64">
        <Lottie
          animationData={errorAnimation}
          loop={true}
          className="w-full h-full"
        />
      </div>
      
      <p className="text-green-700 text-lg max-w-md text-center">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
