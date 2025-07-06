import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import postService from "../Services/PostService";
import Button from '../Components/Button'

function ProductFeature() {
  const navigate = useNavigate();
  const [data , setData] = useState([]);
  useEffect(() => {
    const fetchData = async()=>{
       try {
    const response = await postService.getListing();
     setData(response.data);
     console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    }
    fetchData();
  }, [])
  
  return (
    <div className="flex flex-col items-start justify-start w-full md:px-5 px-2.5 py-40 gap-14">
      <h1 className="text-4xl px-2.5">
        Our choice of <br /> popular{" "}
        <span className="font-bold">real estate</span>
      </h1>
      <div className="flex flex-wrap md:px-5  items-center justify-around gap-32 w-full">
       {data.map((item,i) => i < 6 ? (<ProductCard data={item} key={item._id} />) : (""))}

      </div>
      <div className="flex items-center justify-center w-full py-4">
      <Button 
      text={"Browse More Properties"}
      className={"bg-[#FB8053] py-7 text-white"}
      onClick={()=> navigate('/listings')}
      />
      </div>
    </div>
  );
}

export default ProductFeature;
