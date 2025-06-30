import axios from 'axios'


class AuthService {
    url 
    constructor(){
       this.url = "https://mern-real-estate-app-production.up.railway.app/api/user";
    }

async SignupUser(token , user) {
  try {
    const response = await axios.post(
      `${this.url}/register`,
      user, // No body needed
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    console.error("SignupError", error.response?.data || error.message);
  }
}

  async updateUser (data , token) {
  try {
    const response = await axios.put(`${this.url}/updateUser`, data, {
      headers: {
        Authorization: `Bearer ${token}`
        // Do NOT manually set Content-Type here
      }
    });
    return response;
  } catch (error) {
    console.error("Update User Error", error.response?.data || error.message);
  }
}


}

const authService = new AuthService();

export default authService;