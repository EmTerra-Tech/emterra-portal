import createAxiosClient from "@/utils/axiosClient";
import { EmissionDataRequest } from "./types";

const client = createAxiosClient(
  process.env.BE_BASE_URL + "/branches" || "http://localhost:8080/branches"
);

const saveEmissionData = async (emissionData: EmissionDataRequest) => {
  try {
    const response = await client.post("/emission-data", emissionData);
    return response.data;
  } catch (error: any) {
    console.error("Error saving emission data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to save emission data"
    );
  }
};

const EmissionActions = {
  saveEmissionData,
};

export default EmissionActions;
