import createAxiosClient from "@/utils/axiosClient";
import { LoginFormDataType, SignUpFormDataType } from "./types";

const client = createAxiosClient(process.env.BE_BASE_URL + "/users" || "http://localhost:4000/api/auth");

const signUpAndCreateUser = async (userData: SignUpFormDataType) => {
  try {
    console.log("Signing up user with data:", userData);
    const response = await client.post("/signupCompanyAndUser", userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

const loginUser = async (data: LoginFormDataType) => {
  try {
    const response = await client.post("/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

const AuthActions = {
  signUpAndCreateUser,
  loginUser,
};

export default AuthActions;
