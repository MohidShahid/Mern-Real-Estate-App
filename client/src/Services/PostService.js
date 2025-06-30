import axios from 'axios'

class PostService {
    constructor() {
        this.url = "https://mern-real-estate-app-production.up.railway.app/api/post"; // Make sure this is correctly set
    }

    async AddListing(data, token) { // 'data' here will be the FormData object
        try {
            const response = await axios.post(`${this.url}/createProperty`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // No need to set 'Content-Type': 'multipart/form-data'. Axios handles it for FormData.
                }
            });
            return response;
        } catch (error) {
            console.error("AddListing Error", error.response?.data || error.message);
            throw error; // Re-throw the error so it can be caught in the component
        }
    }

    async getListing(token){
        try {
          const response = await axios.get(`${this.url}/`,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            console.error("Get Listing Error" , error.response?.data || error.message)
        }
    }

    async userListing (token){
       try {
          const response = await axios.get(`${this.url}/userLists` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
          })
          return response;
       } catch (error) {
        console.error("User Listing Error" , error.response?.data || error.message)
       }
    }

    async deleteProperty (id , token){
        try {
            console.log(token);
          const res = await axios.delete(`${this.url}/deleteProperty` ,  {
              data : {id},
                headers :{
                    Authorization : `Bearer ${token}`
                }
            })
         return res;
        } catch (error) {
            console.error("delete Property Error" , error.response?.data || error.message)
        }
    }

    async getProperty (id , token){
        try {
          const res =  await axios.get(`${this.url}/getProperty/${id}` ,{
            headers : {
                Authorization : `Bearer ${token}`
            }
          })
          return res;
        } catch (error) {
            console.error("Get Property Error" , error.response?.data || error.message)
        }
    }

   async updateProperty(id, data, token) {
  try {
    const res = await axios.put(
      `${this.url}/updateProperty/${id}`,
      data, // this is the actual update data
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error("Update Property Error", error.response?.data || error.message);
  }
}
}

const postService = new PostService();
export default postService;