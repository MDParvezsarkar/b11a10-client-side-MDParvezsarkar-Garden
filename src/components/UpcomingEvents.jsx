// UpcomingEvents.jsx
import React from "react";
import Lottie from "lottie-react";
import gardenAnim from "../assets/lottie/Tomato plant.json"; 

const events = [
  {
    id: 1,
    title: "🌼 Spring Planting Workshop",
    date: "2025-08-10",
    location: "Greenhouse Plaza",
  },
  {
    id: 2,
    title: "🍀 Organic Compost Seminar",
    date: "2025-08-15",
    location: "Online",
  },
  {
    id: 3,
    title: "🌿 Rooftop Garden Tour",
    date: "2025-08-22",
    location: "City Rooftops",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 my-10">
      <h2 className="text-3xl text-black font-bold flex justify-center items-center gap-4 text-center mb-6">
         Upcoming Gardening Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-green-50 border border-green-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
          </div>
        ))}
      </div>

      {/* Lottie Animation */}
      <div className="w-72 mx-auto mt-10">
        <Lottie animationData={gardenAnim} loop={true} />
      </div>
    </div>
  );
};

export default UpcomingEvents;
