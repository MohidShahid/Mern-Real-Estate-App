import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import postService from "../Services/PostService";
import { useAuth0 } from "@auth0/auth0-react";

function ProductFeature() {
  const {getAccessTokenSilently} = useAuth0();
  const [data , setData] = useState([]);
  useEffect(() => {
    const fetchData = async()=>{
       try {
    const token = await getAccessTokenSilently();
    const response = await postService.getListing(token);
     setData(response.data);
     console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    }
    fetchData();
  }, [])
  
  return (
    <div className="flex flex-col items-start justify-start w-full px-5 py-40 gap-14">
      <h1 className="text-4xl px-2.5">
        Our choice of <br /> popular{" "}
        <span className="font-bold">real estate</span>
      </h1>
      <div className="flex flex-wrap px-5 items-center justify-around gap-32">
       {data.map((item) => <ProductCard data={item} key={item._id} />)}

      </div>
    </div>
  );
}

export default ProductFeature;
