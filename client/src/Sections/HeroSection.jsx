import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useRef, useEffect } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image1 from "../assets/Images/dillon.jpg";
import Image2 from "../assets/Images/brian.jpg";
import Image3 from "../assets/Images/tierra.jpg";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { Search, ChevronDown } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";

function HeroSection() {
  const [CategoryOptions, setCategoryOptions] = useState(false);
  const [LocationOptions, setLocationOptions] = useState(false);
  const InputCategory = useRef(null);
  const InputLocation = useRef(null);
  const CategoryBox = useRef(null);
  const LocationBox = useRef(null);

  // 📦 Close dropdowns if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        CategoryBox.current &&
        !CategoryBox.current.contains(event.target) &&
        LocationBox.current &&
        !LocationBox.current.contains(event.target)
      ) {
        setCategoryOptions(false);
        setLocationOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ width: "100%", height: "600px" }} className={`slider-box px-5`}>
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        effect="fade"
        style={{ width: "100%", height: "100%" }}
        className="rounded-md relative"
      >
        <SwiperSlide>
          <img
            src={Image1}
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Image2}
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Image3}
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <div className="slide-caption flex flex-col gap-3.5 absolute left-0 top-1/5 z-2 w-full bg-opacity-50 text-white text-4xl p-4">
          <h1 className="md:text-6xl/normal text-5xl/snug font-bold">
            Buy or Rent Properties <br />
            with no commission
          </h1>
          <div className="flex flex-col justify-center p-4">
            <div className="flex flex-row items-center gap-0.5">
              <label
                htmlFor="buy"
                className="text-sm py-0.5 px-2 bg-[#f1efefc3] active:bg-white text-[#555] rounded-sm "
              >
                Buy
              </label>
              <label
                htmlFor="rent"
                className="text-sm py-0.5 px-2 bg-[#fff] text-[#555] rounded-sm "
              >
                For Rent
              </label>
              <label
                htmlFor="sell"
                className="text-sm py-0.5 px-2 bg-[#f1efefc3] text-[#555] rounded-sm"
              >
                Sell
              </label>
            </div>
            <div className="filterMenu py-6 px-8 flex flex-row gap-3 rounded-md bg-[#f1efefc3] shadow-lg">
              <div
                className="relative cursor-pointer w-full"
                onClick={() => {
                  setCategoryOptions(!CategoryOptions);
                  setLocationOptions(false); // close other
                }}
                ref={CategoryBox}
              >
                <Input
                  type={"text"}
                  placeholder={"Category"}
                  className="w-full h-10 px-3 py-6 rounded-md border text-gray-700 border-gray-300"
                  ref={InputCategory}
                />
                <ChevronDown className="absolute z-3 right-3 top-3 text-gray-500" />
                {CategoryOptions && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content w-full menu bg-base-100 rounded-box z-1 p-2 shadow-sm text-gray-700"
                  >
                    {["Apartment", "Condos", "Houses", "Villas"].map((a, i) => (
                      <li key={i}>
                        <a>{a}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div
                className="relative cursor-pointer w-full"
                onClick={() => {
                  setLocationOptions(!LocationOptions);
                  setCategoryOptions(false); // close other
                }}
                ref={LocationBox}
              >
                <Input
                  type={"text"}
                  placeholder={"Location"}
                  className="w-full h-10 px-3 py-6 rounded-md border text-gray-700  border-gray-300"
                  ref={InputLocation}
                />
                <ChevronDown className="absolute z-3 right-3 top-3 text-gray-500" />
                {LocationOptions && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content w-full menu bg-base-100 rounded-box z-1 p-2 shadow-sm text-gray-700"
                  >
                    {["Brooklyn", "Manhattan", "Queens", "Staten Land", "The Bronx"].map((a, i) => (
                      <li key={i}>
                        <a>{a}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Button
                text={"Search Property"}
                className="bg-[#FFCC41] py-6 px-8 outline-none flex justify-start gap-2"
                icon={<Search />}
              />
            </div>
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default HeroSection;
