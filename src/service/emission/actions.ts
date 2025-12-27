import createAxiosClient from "@/utils/axiosClient";
import { EmissionDataRequest } from "./types";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/branches`);

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
