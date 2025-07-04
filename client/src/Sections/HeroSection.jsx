import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, EffectFade } from "swiper/modules";
import Image1 from "../assets/Images/House (3).jpg";
import Image2 from "../assets/Images/House (7).jpg";
import Image3 from "../assets/Images/House (10).jpg";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { Search, ChevronDown } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";

function HeroSection() {
  const [CategoryOptions, setCategoryOptions] = useState(false);
  const [LocationOptions, setLocationOptions] = useState(false);
  const [show, setShow] = useState(false);
  const InputCategory = useRef(null);
  const InputLocation = useRef(null);
  const CategoryBox = useRef(null);
  const LocationBox = useRef(null);
  const navigate = useNavigate();
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

  const handleSearch = () => {
    const category = InputCategory.current?.value;
    const location = InputLocation.current?.value;
    console.log(category , location)
    if (category || location) {
      navigate(`/archive?category=${category}&location=${location}`);
    } else {
      setShow(true);
      setTimeout(()=> setShow(false),3000)
    }
  };
  return (
    <>
    { show &&
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Location and Category Both are missing</span>
      </div> }
      <div className={`w-full h-[600px] md:px-5 relative`}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          effect="fade"
          className="rounded-md relative w-full md:h-full h-auto"
        >
          <SwiperSlide>
            <img src={Image1} alt="Slide 1" className="w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Image2} alt="Slide 2" className="w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Image3} alt="Slide 3" className="w-full object-cover" />
          </SwiperSlide>
          <div className="slide-caption flex flex-col gap-3.5 absolute left-0 top-1/5 z-2 w-full bg-opacity-50 text-white p-4">
            <h1 className="md:text-6xl/normal text-3xl/snug font-bold capitalize">
              Buy or Rent Properties <br />
              with no commission
            </h1>
          </div>
        </Swiper>
        <div className="flex flex-col justify-center p-4 relative md:mt-[-134px] z-10">
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
                  {["Rent", "Sell"].map((a, i) => (
                    <li
                      onClick={() => (InputCategory.current.value = a)}
                      key={i}
                    >
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
                  {[
                    "Karachi",
                    "Lahore",
                    "Islamabad",
                    "Rawalpindi",
                    "Faisalabad",
                    "Multan",
                    "Peshawar",
                    "Quetta",
                    "Hyderabad",
                    "Sialkot",
                    "Murree",
                    "Swat",
                    "Hunza",
                    "Skardu",
                    "Gilgit",
                    "Malam Jabba",
                    "Fairy Meadows",
                    "Chitral",
                    "Nathia Gali",
                    "Muzaffarabad",
                  ].map((a, i) => (
                    <li
                      key={i}
                      onClick={() => (InputLocation.current.value = a)}
                    >
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
              onClick={()=>handleSearch()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
