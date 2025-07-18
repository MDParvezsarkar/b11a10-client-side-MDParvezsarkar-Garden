
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

import TopTrendingTips from "../components/TopTrendingTips";
import FeaturedGardeners from "../components/FeaturedGardeners";
import GardeningFAQ from "../components/GardeningFAQ";
import UpcomingEvents from "../components/UpcomingEvents";

const Home = () => {
  

  return (
    <div>
      {/* Banner/Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop
        className="h-[80vh]"
      >
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src="https://i.ibb.co/DfRT69jk/bg3.jpg"
              alt="Event 1"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-black bg-opacity-40">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 p-10">
                Spring Gardening Fest
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src="https://i.ibb.co/HLD2b4CQ/bg1.jpg"
              alt="Event 2"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-black bg-opacity-40">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 p-10">
                Learn Organic Farming
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src="https://i.ibb.co/GfZckW1C/bg2.jpg"
              alt="Event 3"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-black bg-opacity-40">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 p-10">
                Urban Gardening Workshop
              </h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Top Trending Tips */}
      <div>
        <h1 className="text-3xl text-black font-bold flex justify-center items-center gap-4 text-center my-6">
          Top Trending Tips
        </h1>
        <TopTrendingTips />
      </div>

      {/* Featured Gardeners */}
      <FeaturedGardeners />

      {/* extra component */}
      <GardeningFAQ />
      <UpcomingEvents />
    </div>
  );
};

export default Home;
