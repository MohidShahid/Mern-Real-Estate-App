import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../Services/PostService";
import { Locate, LandPlot , Bath , BedDouble } from "lucide-react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";

function PropertyDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchProperty = async () => {
      const res = await postService.getProperty(id);
      console.log(res.data);
      setData(res.data.property);
    };
    fetchProperty();
  }, [id]);
  console.log(data);
  const {
    title,
    description,
    PhoneNo,
    category,
    features,
    location,
    price,
    Images = [],
  } = data;
  console.log(data.location?.address);
  if (!data || !data.location) {
    return <Loading />;
  } else {
    return (
      <>
        <Navbar />
        <div className="flex flex-col w-full items-center justify-center gap-7 pt-2.5 pb-14 px-3.5">
            <div className="flex flex-col items-start justify-start">
          <div className="flex flex-col items-start justify-center w-[83%] gap-8 ">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
              }}
              className="rounded w-[91vw]"
            >
              {Images.length > 0 ? ( // Check if Images array has content
                Images.map((imagelink, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={imagelink}
                      alt={`Property image ${i + 1}`}
                      className="w-full h-72 md:h-[70vh] object-cover" // Added object-cover for better image fitting
                    />
                  </SwiperSlide>
                ))
              ) : (
                // Fallback for no images
                <SwiperSlide>
                  <img
                    src="/path/to/placeholder-image.jpg" // Provide a path to a placeholder image
                    alt="No images available"
                    className="w-full h-48 object-cover bg-gray-200 flex items-center justify-center text-gray-500"
                  />
                </SwiperSlide>
              )}
            </Swiper>
            <div className="flex flex-col">
            <h1 className="flex gap-5 text-2xl font-semibold py-5">
              {title}
              <div className="badge badge-warning">{category}</div>
            </h1>
            <p className="text-gray-500">{description}</p>
            <span className="flex gap-2.5 py-1.5 pl-3.5 mt-3 bg-[#d4d4d480] rounded-4xl text-gray-400">
              <Locate strokeWidth={1}/> {location?.address || ""}{" "}
              {" " +
                location?.city +
                " " +
                location?.country +
                ", " +
                location?.postalCode}
            </span>
            <h3 className="text-3xl font-semibold text-gray-700 py-10">
            {price ? `$ ${price.toLocaleString()}` : 'Price on request'} {/* Formatted price and fallback */}
          </h3>
           <button className="flex justify-start bg-[#FFCC41] p-3.5 text-lg rounded text-gray-700 font-semibold tracking-widest">{PhoneNo}</button>
            </div>
          </div>
          <div className="flex flex-col gap-5 py-10 w-11/12">
            <h1 className="text-2xl font-semibold">Features</h1>
            <div className="flex flex-wrap gap-4">
            <span className="flex gap-2.5 p-3 border-2 rounded bg-gray-200 border-gray-100"><LandPlot strokeWidth={1}/>Area: {features?.area}m</span>
            <span className="flex gap-2.5 p-3 border-2 rounded bg-gray-200 border-gray-100"><BedDouble strokeWidth={1}/>Bedroom: {features?.bedroom}</span>
            <span className="flex gap-2.5 p-3 border-2 rounded bg-gray-200 border-gray-100"><Bath strokeWidth={1}/>Bathroom: {features?.bathroom}</span>
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default PropertyDetail;
