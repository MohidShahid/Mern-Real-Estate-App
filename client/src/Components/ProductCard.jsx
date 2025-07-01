import { BedDouble, LandPlot, MapPinHouseIcon, Bath } from "lucide-react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";


function ProductCard({ data }) {
  // Ensure data and its nested properties exist before trying to access them
  if (!data) {
    return <div className="text-red-500">Error: No product data provided.</div>;
  }

  // Destructure for easier access and provide default empty arrays for images
  const {
    Images = [],
    category,
    price,
    title,
    description,
    features,
    location,
    _id,
  } = data;

  // Provide default values for nested objects to prevent errors if they are missing
  const { area, bedroom, bathroom } = features || {};
  const { address, postalCode, coordinates } = location || {};


  return (
    <Link to={`/property-detail/${_id}`} className="flex flex-col items-start justify-center md:!w-96 !w-[99%] h-auto border rounded-lg shadow-md overflow-hidden">
      <div className="w-full relative">
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          className="rounded"
        >
          {Images.length > 0 ? ( // Check if Images array has content
            Images.map((imagelink, i) => (
              <SwiperSlide key={i}>
                <img
                  src={imagelink.replace("/upload/", "/upload/q_auto,f_auto,f_webp/")}
                  alt={`Property image ${i + 1}`}
                  className="w-full h-48 object-cover" // Added object-cover for better image fitting
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
        <span className="absolute top-[7%] left-[-3px] z-3 text-gray-500 text-md font-bold py-1.5 px-6 bg-[#E6F1EF] rounded">
          {category}
        </span>
      </div>
      <div className="flex gap-3 flex-col pb-4 pt-2 px-4 w-full"> {/* Added padding and full width */}
        <span className="flex gap-2 text-sm text-gray-600 items-center">
          <MapPinHouseIcon strokeWidth={1} size={18} />
          {/* Ensure location.address exists before accessing it */}
          {address ? address : 'Location not specified'} {/* Display address instead of city/country */}
        </span>
        <h1 className="font-bold text-2xl truncate" title={title}>{title}</h1> {/* Changed to 2xl, added truncate and title for long titles */}
        <p className="pb-2.5 text-sm text-gray-700 line-clamp-3"> {/* Added line-clamp for description */}
          {description}
        </p>
        <div className="border-t border-[#dcd5d5] flex justify-between pt-5 items-center"> {/* Added items-center for vertical alignment */}
          <h3 className="text-xl font-semibold text-[#FB8053]">
            {price ? `${price.toLocaleString()} $` : 'Price on request'} {/* Formatted price and fallback */}
          </h3>
          <div className="flex gap-4 text-gray-600">
            {area && (
              <span className="flex gap-1.5 items-center">
                <LandPlot strokeWidth={1} size={18} />{area}m<sup>2</sup>
              </span>
            )}
            {bedroom && (
              <span className="flex gap-1.5 items-center">
                <BedDouble strokeWidth={1} size={18} />{bedroom}
              </span>
            )}
            {bathroom && (
              <span className="flex gap-1.5 items-center">
                <Bath strokeWidth={1} size={18} />{bathroom}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;