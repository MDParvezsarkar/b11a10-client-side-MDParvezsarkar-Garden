// components/FeaturedGardeners.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FaRocket } from "react-icons/fa";

const FeaturedGardeners = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://eden-garden-server.vercel.app/gardeners?status=Active&limit=6"
      )
      .then((res) => setGardeners(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-4 py-8 text-center mx-auto">
      <h2 className="text-3xl text-black font-bold flex justify-center items-center gap-4 text-center mb-6">
        <FaRocket className="" />
        Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gardeners.map((gardener) => (
          <div
            key={gardener._id}
            className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-all"
          >
            <img
              src={gardener.image}
              alt={gardener.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{gardener.name}</h3>
            <p className="text-sm text-gray-500">
              Experience: {gardener.experience}
            </p>
            <p className="text-sm text-gray-500">
              Total Tips: {gardener.totalTips}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedGardeners;
