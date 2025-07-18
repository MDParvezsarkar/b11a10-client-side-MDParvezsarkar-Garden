import React from "react";
import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <MoonLoader size={80} color="#16a34a" speedMultiplier={1.5} />
    </div>
  );
};

export default Loader;
