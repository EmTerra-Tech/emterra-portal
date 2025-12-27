import createAxiosClient from "@/utils/axiosClient";
import { setCookie, deleteCookie } from "@/utils/cookies";
import { LoginFormDataType, SignUpFormDataType } from "./types";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/users`);

const signUpAndCreateUser = async (userData: SignUpFormDataType) => {
  try {
    const response = await client.post("/signupCompanyAndUser", userData);

    // Store tokens if signup returns them (optional, backend might not return tokens on signup)
    if (response.data.success && response.data.data?.accessToken) {
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error signing up:", error);
    throw new Error(error.response?.data?.message || "Failed to sign up");
  }
};

const loginUser = async (data: LoginFormDataType) => {
  try {
    const response = await client.post("/login", data);

    if (response.data.success && response.data.data) {
      const { accessToken, refreshToken, user } = response.data.data;

      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Store accessToken in cookies for middleware
      setCookie("accessToken", accessToken, 7);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error logging in:", error);
    throw new Error(error.response?.data?.message || "Failed to log in");
  }
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  deleteCookie("accessToken");
  window.location.href = "/";
};

const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

const AuthActions = {
  signUpAndCreateUser,
  loginUser,
  logout,
  getUser,
  isAuthenticated,
};

export default AuthActions;
