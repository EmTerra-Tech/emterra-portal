import createAxiosClient from "@/utils/axiosClient";
import { Scope } from "./types";

const client = createAxiosClient(
  process.env.BE_BASE_URL + "/data-collection" || "http://localhost:8080/data-collection"
);

const EmissionCollectionActions = {
  fetchEmissionCollectionData: async (): Promise<Scope[]> => {
    try {
      const response = await client.get("/overview");
      // Response format: { success: true, message: "Success", data: { scopes: [...] } }
      if (response.data.success && response.data.data && response.data.data.scopes) {
        return response.data.data.scopes;
      }
      // Return empty array if no data
      return [];
    } catch (error: any) {
      console.error("Error fetching data collection overview:", error);
      // Return empty array on error
      return [];
    }
  },
};

export default EmissionCollectionActions;