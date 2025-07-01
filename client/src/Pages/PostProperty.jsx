import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import Footer from "../Sections/Footer";
import Navbar from "../Sections/Navbar";
import postService from "../Services/PostService";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

function PostProperty() {
  const { id } = useParams();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const images = watch("images");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (id) {
          const token = await getAccessTokenSilently();
          const response = await postService.getProperty(id, token);
          const property = response.data.property;

          // Pre-fill form
          setValue("title", property.title);
          setValue("description", property.description);
          setValue("category", property.category);
          setRole(property.category);
          setValue("PhoneNo", property.PhoneNo);
          setValue("address", property.location.address);
          setValue("postalCode", property.location.postalCode);
          setValue("city", property.location.city);
          setValue("country", property.location.country);
          setValue("bedroom", property.features.bedroom);
          setValue("bathroom", property.features.bathroom);
          setValue("area", property.features.area);
          setValue("price", property.price);
        }
      } catch (error) {
        console.error("Error loading property:", error);
      }
    };

    fetchProperty();
  }, [id, getAccessTokenSilently, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = await getAccessTokenSilently();

      if (id) {
        // Update mode - plain JSON
        const payload = {
          title: data.title,
          description: data.description,
          category: data.category,
          PhoneNo: data.PhoneNo,
          location: {
            address: data.address,
            postalCode: data.postalCode,
            city: data.city,
            country: data.country,
          },
          features: {
            bedroom: data.bedroom,
            bathroom: data.bathroom,
            area: data.area,
          },
          price: data.price,
        };

        const response = await postService.updateProperty(id, payload, token);
        console.log(response);
        setMessage("Property updated successfully!");
      } else {
        // Post mode - use FormData
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("PhoneNo", data.PhoneNo);
        formData.append("address", data.address);
        formData.append("postalCode", data.postalCode);
        formData.append("city", data.city);
        formData.append("country", data.country);
        formData.append("bedroom", data.bedroom);
        formData.append("bathroom", data.bathroom);
        formData.append("area", data.area);
        formData.append("price", data.price);

        if (images?.length) {
          for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
          }
        }

        console.log(formData);
        const response = await postService.AddListing(formData, token);
        console.log(response);
        setMessage("Property posted successfully!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full px-4 lg:px-20 py-10">
        <h1 className="text-3xl lg:text-5xl font-bold mb-10 text-center lg:text-left">
          {id ? "Update Property" : "Post a Property"}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-10 w-full"
        >
          {/* Left Section */}
          <div className="flex flex-col w-full lg:w-1/2 gap-4">
            <Input
              type="text"
              placeholder="Enter the title"
              {...register("title", { required: "Title is required" })}
              className="w-full"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}

            <textarea
              placeholder="Enter the description"
              {...register("description", {
                required: "Description is required",
                maxLength: { value: 400, message: "Too long" },
              })}
              className="w-full h-40 textarea border p-2 rounded"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}

            {/* Category dropdown */}
            <div className="relative">
              <details className="dropdown w-full">
                <summary className="btn w-full">
                  {role || "Select Category"} <ChevronDown />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box w-full p-2 shadow-md z-[1]">
                  {["Sell", "Rent", "Buy"].map((e) => (
                    <li
                      key={e}
                      className="cursor-pointer"
                      onClick={() => {
                        setRole(e);
                        setValue("category", e, { shouldValidate: true });
                      }}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </details>
              <input
                type="hidden"
                {...register("category", { required: "Category is required" })}
              />
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            <Input
              type="text"
              placeholder="Phone Number"
              {...register("PhoneNo", { required: "Phone number is required" })}
              className="w-full"
            />
            {errors.PhoneNo && (
              <p className="text-red-500">{errors.PhoneNo.message}</p>
            )}

            <Input
              type="text"
              placeholder="Address"
              {...register("address", { required: "Address is required" })}
              className="w-full"
            />
            <Input
              type="number"
              placeholder="Postal Code"
              {...register("postalCode", {
                required: "Postal Code is required",
              })}
              className="w-full"
            />
          </div>

          {/* Right Section */}
          <div className="features w-full lg:w-1/2 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Features</h2>

            <Input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
              className="w-full"
            />
            <Input
              type="text"
              placeholder="Country"
              {...register("country", { required: "Country is required" })}
              className="w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Bedroom"
                {...register("bedroom", { required: "Required" })}
                className="w-full"
              />
              <Input
                type="number"
                placeholder="Bathroom"
                {...register("bathroom", { required: "Required" })}
                className="w-full"
              />
            </div>

            <Input
              type="number"
              placeholder="Area (sqft)"
              {...register("area", { required: "Area is required" })}
              className="w-full"
            />
            <Input
              type="number"
              placeholder="Price"
              {...register("price", { required: "Price is required" })}
              className="w-full"
            />

            {!id && (
              <input
                type="file"
                accept="image/*"
                multiple
                className="file-input file-input-bordered w-full"
                {...register("images", {
                  required: "At least one image is required",
                })}
              />
            )}
            {errors.images && (
              <p className="text-red-500">{errors.images.message}</p>
            )}

            <Input
              type="submit"
              value={id ? "Update" : "Post"}
              className="bg-yellow-400 text-black w-full"
            />
            {message && <p className="text-green-600">{message}</p>}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default PostProperty;
