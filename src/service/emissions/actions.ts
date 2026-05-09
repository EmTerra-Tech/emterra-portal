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
   * Years for which the company has any emission data (always includes the
   * current year). Optionally narrowed to a single scope.
   */
  getAvailableYears: async (scope?: string): Promise<number[]> => {
    try {
      const params: Record<string, string> = {};
      if (scope) params.scope = scope;
      const res = await client.get("/emission-data/years", { params });
      const years = res.data?.data ?? [];
      return Array.isArray(years) ? years.map((y: any) => Number(y)).filter(Number.isFinite) : [];
    } catch (err) {
      console.error("Failed to fetch available years", err);
      return [new Date().getFullYear()];
    }
  },

  /**
   * Fetch emission data filtered by scope (and optionally year) from the backend.
   * The BE filters by ?scope= and ?year= and defaults to the current year when year is omitted.
   */
  getCombustionEntries: async (scope: string, year?: number): Promise<CombustionEntry[]> => {
    try {
      const params: Record<string, string> = {};
      if (scope) params.scope = scope;
      if (year !== undefined) params.year = String(year);
      const response = await client.get("/emission-data", { params });
      if (response.data.success && response.data.data) {
        return response.data.data as CombustionEntry[];
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
      return { success: false };
    }
  },
};

export default EmissionCollectionActions;
