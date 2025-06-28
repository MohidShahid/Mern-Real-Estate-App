import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import Footer from "../Sections/Footer";
import Navbar from "../Sections/Navbar";
import postService from "../Services/PostService";
import { useAuth0 } from "@auth0/auth0-react";

// ... (imports and other code)

function PostProperty() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const images = watch("images"); // to access selected files

  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  const onSubmit = async (data) => {
    try {
      const token = await getAccessTokenSilently();

      // Create FormData object
      const formData = new FormData();

      // Append all text fields
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category); // Ensure this is set from the dropdown
      formData.append("PhoneNo", data.PhoneNo);
      formData.append("address", data.address);
      formData.append("postalCode", data.postalCode);
      formData.append("bedroom", data.bedroom);
      formData.append("bathroom", data.bathroom);
      formData.append("area", data.area);
      formData.append("price", data.price);
      formData.append("country", data.country);
      formData.append("city" , data.city);

      // Append image files
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

      // Pass formData and specify content-type
      const response = await postService.AddListing(formData, token);
      setMessage("Added Successfully");
      console.log(response);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start justify-center py-14 gap-12 w-full pl-20">
        <h1 className="text-5xl font-bold">Post a Property</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-16 w-full">
          <div className="flex flex-col w-2/4 gap-2.5">
            <Input
              type={"text"}
              placeholder={"Enter the title"}
              {...register("title", { required: "Title is required" })} // Added validation
              className={"w-full"}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

            <textarea
              type={"text"}
              placeholder={"Enter the description"}
              {...register("description", {
                required: "Description is required",
                maxLength: { value: 400, message: "Description too long" },
              })}
              className={"w-full h-52 textarea"}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

            <div className="flex items-center justify-start w-full">
              <details className="dropdown w-2/3">
                <summary className="btn m-1">
                  {role || "Select a Category"}
                  <ChevronDown />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm gap-2.5">
                  {["Sell", "Rent"].map((e) => (
                    <li
                      key={e}
                      className="cursor-pointer hover:bg-amber-50"
                      onClick={() => {
                        setRole(e);
                        setValue("category", e, { shouldValidate: true }); // Use "category" as per schema, and validate
                      }}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </details>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
              <input type="hidden" {...register("category", { required: "Category is required" })} />

              <Input
                type={"Number"}
                placeholder={"Enter Your Phone Number?"}
                {...register("PhoneNo", { required: "Phone number is required" })}
                className={"w-full"}
              />
              {errors.PhoneNo && <p className="text-red-500 text-sm">{errors.PhoneNo.message}</p>}
            </div>
            <Input
              type={"text"}
              placeholder={"Address"}
              {...register("address", { required: "Address is required" })}
              className={"w-full"}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            <Input
              type={"Number"}
              placeholder={"Postal Code"}
              {...register("postalCode", { required: "Postal Code is required" })}
              className={"w-full"}
            />
            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
          </div>
          <div className="features w-1/2 flex flex-col gap-2.5">
            <h2 className="text-2xl font-bold">Features</h2>
            <Input
              type={"text"}
              placeholder={"City"}
              {...register("city", { required: "City is required" })}
            />
            <Input
              type={"text"}
              placeholder={"Country"}
              {...register("country", { required: "Country Code is required" })}
            />
            <Input
              type={"Number"}
              placeholder={"Bedroom"}
              {...register("bedroom", { required: "Bedroom count is required", valueAsNumber: true })}
            />
            {errors.bedroom && <p className="text-red-500 text-sm">{errors.bedroom.message}</p>}
            <Input
              type={"Number"}
              placeholder={"Bathroom"}
              {...register("bathroom", { required: "Bathroom count is required", valueAsNumber: true })}
            />
            {errors.bathroom && <p className="text-red-500 text-sm">{errors.bathroom.message}</p>}
            <Input
              type={"Number"}
              placeholder={"Area (sqm)"}
              {...register("area", { required: "Area is required", valueAsNumber: true })}
            />
            {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
            <Input
              type={"Number"}
              placeholder={"Price($)"}
              {...register("price", { required: "Price is required", valueAsNumber: true })}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            <input // Changed to a regular input as `Input` component might not handle `files` correctly
              type="file"
              accept="image/*"
              multiple
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("images", { required: "At least one image is required" })} // Register the file input directly
            />
            {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}

            <Input type={"submit"} className={"bg-[#FFCC41] "} />
          </div>
          {message && <p className="text-green-600">{message}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default PostProperty;