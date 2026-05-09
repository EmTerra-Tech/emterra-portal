import createAxiosClient from "@/utils/axiosClient";
import { Scope } from "./types";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/data-collection`);

const EmissionCollectionActions = {
  /**
   * Fetch the data-collection overview. If `year` is omitted the BE defaults
   * to the current calendar year.
   */
  fetchEmissionCollectionData: async (year?: number): Promise<Scope[]> => {
    try {
      const url = year !== undefined ? `/overview?year=${year}` : "/overview";
      const response = await client.get(url);
      if (response.data?.success && response.data?.data?.scopes) {
        return response.data.data.scopes;
      }
      return [];
    } catch (error: any) {
      console.error("Error fetching data collection overview:", error);
      return [];
    }
  },
};

export default EmissionCollectionActions;