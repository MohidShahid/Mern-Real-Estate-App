import Navbar from '../Sections/Navbar'
import Footer from '../Sections/Footer'
import postService from '../Services/PostService';
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
// import ProductCard from '../Components/ProductCard'
function Archive() {
  const [searchParams , setSearchParams] = useSearchParams();
  const [result , setResult] = useState([]);
  const category = searchParams.get('category') || "";
  const location = searchParams.get('location') || "";

  useEffect(()=>{
    const filterResult = async()=>{
     const res = await postService.filterByCategoryAndLocation({category , location})
     console.log(res)
     setResult(res);
    }
   filterResult();
  },[category , location])
  
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-start justify-start w-full px-5 py-40 gap-14">
      <h1 className="text-4xl px-2.5">
      {result?.length} Result Found
      </h1>
      <div className="flex flex-wrap md:px-5 items-center justify-around gap-32 w-full h-auto">
       {result.map((item) => <ProductCard data={item} key={item._id} />)}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Archive