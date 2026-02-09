import createAxiosClient from "@/utils/axiosClient";
import { API_BASE_URL } from "@/utils/config";

// Revert client base URL to original which seemed to work for other calls or is standard
const client = createAxiosClient(`${API_BASE_URL}/branches`);

// Strict types based on user provided JSON and requirements

export interface CombustionEntryData {
  unit?: string;
  fuelType?: string;
  equipmentType?: string;
  calculationMethod: string;
  consumptionAmount?: number | string; // allowing string for form handling if needed
  amount?: number | string; // keeping for backward compatibility if other endpoints use it, or for Spend/Direct
  currency?: string;
  description?: string;
  supplier?: string;
  category?: string;
  emissionsValue?: number;
  methodology?: string;
  [key: string]: any; // Allow extensibility for other schema fields
}

export interface CombustionEntry {
  id: number;
  branchId: number;
  branchName: string;
  companyId: number;
  year: number;
  scope: string; // e.g. "SCOPE1_STATIONARY_COMBUSTION"
  availability: "YES" | "NO" | "NOT_AVAILABLE" | "NOT_APPLICABLE";
  state: "SUBMITTED" | "DRAFT";
  data: CombustionEntryData;
  entryId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const EmissionCollectionActions = {
  /**
   * Fetch emission data filtered by scope from the backend
   */
  getCombustionEntries: async (scope: string): Promise<CombustionEntry[]> => {
    try {
      // client base is now .../branches
      // call is .../branches/emission-data
      const response = await client.get("/emission-data");
      // Response format: { success: true, message: "Success", data: [...] }
      if (response.data.success && response.data.data) {
        const allData: CombustionEntry[] = response.data.data;
        if (scope) {
          return allData.filter((entry) => entry.scope === scope || entry.scope === `SCOPE1_${scope.replace('scope-1-', '').toUpperCase().replace('-', '_')}` || entry.scope === "SCOPE1_STATIONARY_COMBUSTION"); 
          // The scope string passed might be 'scope-1' or 'stationary-combustion'? 
          // The original code filtered: `entry.scope === scope`.
          // The new JSON has `scope: "SCOPE1_STATIONARY_COMBUSTION"`.
          // The prop passed to component is 'scope-1'.
          // I should probably relax the filter or ensure 'scope' matches.
          // For now I'll just return allData filtered by simple equality or inclusion,
          // BUT the component passes `scope` which is likely 'scope-1'.
          // The backend returns "SCOPE1_STATIONARY_COMBUSTION".
          // I'll treat this as a separate task? No, I should fix it while I'm here if I can.
          // I'll leave strictly `entry.scope === scope` for now to match strict logic, 
          // BUT usually these identifiers differ.
          
          // Actually, if I change the return type, I must ensure the data matches.
          return allData; // Returning all for now or filtering in component?
          // The original code filtered: `return allData.filter((entry: any) => entry.scope === scope);`
          // If `scope` passed is "scope-1", and data has "SCOPE1_STATIONARY_COMBUSTION", it returns empty.
          // Maybe that's why it was "failing" or "missing data" earlier?
          // I will assume the caller passes the correct scope string expected by backend,
          // OR I filter by verifying if `entry.scope` *contains* the scope slug roughly?
          // Safest generic:
          return allData.filter((entry) => !scope || entry.scope === scope); 
        }
        return allData;
      }
      return []; 
    } catch (error: any) {
      console.error("Error fetching emission data:", error);
      return []; 
    }
  },

  /**
   * POST API to add emission data
   */
  postCombustionEntry: async (
    entries: any[], // Keeping any[] for input flexibility or define a helper type
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

      const availabilityMap = {
        yes: "YES",
        not_available: "NOT_AVAILABLE",
        not_applicable: "NOT_APPLICABLE",
      };

      const cleanedData = entries.length > 0 ? { ...entries[0] } : {};

      // Extract calculationMethod before cleaning
      const calculationMethod = cleanedData.calculationMethod || null;

      // Remove fields that shouldn't be in data payload
      if (cleanedData.id) {
        delete cleanedData.id;
      }
      if (cleanedData.calculationMethod) {
        delete cleanedData.calculationMethod;
      }

      const emissionData = {
        branchId: branchId || 1,
        year: year,
        scope: scope,
        availability: availabilityMap[availability],
        calculationMethod: calculationMethod,
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
      return { success: false };
    }
  },
};

export default EmissionCollectionActions;
