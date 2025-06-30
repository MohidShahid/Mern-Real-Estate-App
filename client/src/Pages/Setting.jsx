import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postService from "../Services/PostService";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";
import { BedSingleIcon, Bath, LandPlot , LocationEdit } from "lucide-react";
function Setting() {
  const navigate = useNavigate();
  const { getAccessTokenSilently, user } = useAuth0();
  const [list, setList] = useState([]);
  const [getToken , setToken] = useState("");

  const fetchListing = async () => {
      const token = await getAccessTokenSilently();
      setToken(token);
      const res = await postService.userListing(token);
      setList(res.data);
    };

  useEffect(() => {
    fetchListing();
  }, [user]);


   const handlerDelete = async(id)=>{
    try {
      const res = await postService.deleteProperty(id , getToken);
      console.log(res);
      await fetchListing();
    } catch (error) {
      console.error("Deletion Error" , error.message)
    }
   }
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap flex-col items-start justify-center py-20 md:pl-5 pl-2.5 gap-8 w-full">
        <h1 className="text-3xl font-bold">Your Listings</h1>
        {
          list.length > 0 ? (
            list.map((item)=> <div className="flex flex-wrap md:w-11/12 w-full justify-between shadow-md p-4 rounded-2xl" key={item._id}>
          <div className="flex gap-4 md:flex-row md:justify-around flex-col text-gray-500">
          <img src={item.Images[0] || null} alt="" className="md:w-1/3 w-full" />
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl text-black font-semibold">{item.title}</h1>
            <p>{item.description}</p>
            <span className="flex gap-2.5"><LocationEdit />{item.location.address}</span>
            <div className="flex items-center gap-2 pt-2.5 text-gray-500 font-extralight">
              <span className="flex gap-1">
                <BedSingleIcon strokeWidth={1} /> {item.features.bedroom}
              </span>
              <span className="flex gap-3">
                <Bath strokeWidth={1} /> {item.features.bathroom}
              </span>
              <span className="flex gap-3">
                <LandPlot strokeWidth={1}/> {item.features.area}
              </span>
            </div>
            <span className="text-xl text-shadow-gray-700 font-semibold py-2.5">{item.price ? `${(item.price).toLocaleString()} $` : 'Price on request'}</span>
          </div>
          <div className="flex flex-col gap-2">
            <button className="btn btn-soft btn-accent" onClick={()=> navigate(`/postProperty/${item._id}`)}>Edit</button>
            <button className="btn btn-soft btn-error" onClick={()=> handlerDelete(item._id)}>Delete</button>
          </div>
          </div>
        </div>)
          ) : (<><h1 className="text-3xl">Didn't found anything</h1></>)
        }
        
      </div>
      <Footer />
    </>
  );
}

export default Setting;
