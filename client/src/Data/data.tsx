import axios from "axios";
import { User } from './types'; 

// Register user function
export const registerUser = async (userData: User): Promise<unknown> => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/auth/register", userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
