import createAxiosClient from "@/utils/axiosClient";

export type EntryType = "activity" | "spend" | "emissions";

const client = createAxiosClient(
  process.env.BE_BASE_URL + "/branches" || "http://localhost:8080/branches"
);

export interface ActivityEntryData {
  id: number;
  fuelType: string;
  amount: string;
  unit: string;
  equipment: string;
  notes: string;
}

export interface SpendEntryData {
  id: number;
  supplier: string;
  amount: string;
  currency: string;
  category: string;
  description: string;
}

export interface EmissionsEntryData {
  id: number;
  emissionsValue: number;
  unit: string;
  methodology: string;
  description: string;
}

export interface CombustionEntry {
  type: EntryType;
  data: ActivityEntryData | SpendEntryData | EmissionsEntryData;
}

// EmissionCollectionActions: API namespace for emission-related endpoints
const EmissionCollectionActions = {
  /**
   * Fetch emission data filtered by scope from the backend
   */
  getCombustionEntries: async (scope: string): Promise<any[]> => {
    try {
      const response = await client.get("/emission-data");
      // Response format: { success: true, message: "Success", data: [...] }
      if (response.data.success && response.data.data) {
        // Filter by scope if scope is provided
        const allData = response.data.data;
        if (scope) {
          return allData.filter((entry: any) => entry.scope === scope);
        }
        return allData;
      }
      return []; // Return empty array if no data
    } catch (error: any) {
      console.error("Error fetching emission data:", error);
      return []; // Return empty array on error
    }
  },

  /**
   * POST API to add emission data
   */
  postCombustionEntry: async (
    entries: any[],
    scope: string,
    year: number,
    availability: "yes" | "not_available" | "not_applicable",
    state: "DRAFT" | "SUBMITTED",
    branchId?: number
  ): Promise<any> => {
    try {
      if (entries.length === 0 && availability === "yes") {
        return { success: true, message: "No data to save" };
      }

      // Map availability to backend enum
      const availabilityMap = {
        yes: "YES",
        not_available: "NOT_AVAILABLE",
        not_applicable: "NOT_APPLICABLE",
      };

      // Filter out the 'id' field from entry data before sending to backend
      const cleanedData = entries.length > 0 ? { ...entries[0] } : {};
      if (cleanedData.id) {
        delete cleanedData.id;
      }

      const emissionData = {
        branchId: branchId || 1,
        year: year,
        scope: scope,
        availability: availabilityMap[availability],
        state: state,
        data: cleanedData,
      };

      console.log("Sending emission data:", emissionData);
      const response = await client.post("/emission-data", emissionData);
      return response.data;
    } catch (error: any) {
      console.error("Error posting emission data:", error);
      throw new Error(
        error.response?.data?.message || "Failed to save emission data"
      );
    }
  },

  /**
   * Save availability status for a scope
   */
  saveAvailability: async (
    scope: string,
    year: number,
    availability: "yes" | "not_available" | "not_applicable",
    branchId?: number
  ): Promise<any> => {
    try {
      const availabilityMap = {
        yes: "YES",
        not_available: "NOT_AVAILABLE",
        not_applicable: "NOT_APPLICABLE",
      };

      const emissionData = {
        branchId: branchId || 1,
        year: year,
        scope: scope,
        availability: availabilityMap[availability],
        state: "DRAFT",
        data: {},
      };

      const response = await client.post("/emission-data", emissionData);
      return response.data;
    } catch (error: any) {
      console.error("Error saving availability:", error);
      // Don't throw error for availability changes, just log it
      return { success: false };
    }
  },
};

export default EmissionCollectionActions;
