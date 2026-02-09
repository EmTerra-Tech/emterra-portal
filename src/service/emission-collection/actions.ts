import createAxiosClient from "@/utils/axiosClient";
import { Scope } from "./types";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/data-collection`);

const EmissionCollectionActions = {
  fetchEmissionCollectionData: async (year?: number): Promise<Scope[]> => {
    try {
      const url = year ? `/overview?year=${year}` : "/overview";
      const response = await client.get(url);
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