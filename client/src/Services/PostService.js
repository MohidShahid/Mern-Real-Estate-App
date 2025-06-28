import axios from 'axios'

class PostService {
    constructor() {
        this.url = "http://localhost:3000/api/post"; // Make sure this is correctly set
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
          const response =  axios.get(`${this.url}/`,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            console.error("Get Listing Error" , error.response?.data || error.message)
        }
    }
}

const postService = new PostService();
export default postService;