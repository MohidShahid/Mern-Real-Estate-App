import { useState } from "react";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import Input from '../Components/Input'
import {useForm} from 'react-hook-form'
import authService from "../Services/AuthService";
function Profile() {
  const {user , getAccessTokenSilently} = useAuth0();
  const token = getAccessTokenSilently();
  const {handleSubmit , register } = useForm();
  const [message , setmessage] = useState("");


  const onSubmit = async(data)=> {
      const formdata = new FormData();
      formdata.append("email" , data.email);
      formdata.append("image" , data.image[0]);
   const res = await authService.updateUser(formdata , token) ;
   console.log(res);
  }
  return (
    <div className="flex items-center justify-center flex-col">
      <Navbar />
      <form className="flex flex-col py-8 pt-36 gap-16 items-center justify-start h-dvh" onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
            <img src={user.picture} />
          </div>
        </div>
        <div className="flex flex-col gap-5 ">
          <Input 
        type={"file"}
        className={`file-input`}
        {...register("image")}
        />
        {user?.given_name &&
        <Input 
        type={"text"}
        value={user.given_name + " " + user.family_name}
        className={`w-full`}
        /> 
     }
        <Input 
        type={"text"}
        value={user.email}
        className={`w-full`}
        {...register("email")}
        /> 
        <Input 
        type={"submit"}
        value={"Update"}
        />
        </div>
        <p>{message}</p>
      </form>
      <Footer />
    </div>
  );
}

export default Profile;
