import createAxiosClient from "@/utils/axiosClient";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/emission-factors`);

// Scope-to-category mapping (matches BE emission factor JSON categories)
export const SCOPE_TO_CATEGORY: Record<string, string> = {
  SCOPE1_STATIONARY_COMBUSTION: "S1 - Stationary combustion",
  SCOPE1_MOBILE_COMBUSTION: "S1 - Mobile combustion (fuel type)",
  SCOPE1_FUGITIVE_EMISSIONS: "S1 - Refrigerant & other",
  SCOPE2_PURCHASED_ELECTRICITY: "S2 - Purchased electricty (facility use)",
  SCOPE2_HEATING_COOLING: "S2 - Purchased heat and steam",
  SCOPE2_PURCHASED_STEAM: "S2 - Purchased heat and steam",
  SCOPE2_PURCHASED_COOLING: "S2 - Purchased heat and steam",
};

export interface EmissionFactorCalculateRequest {
  category: string;
  activity: string;
  year: string;
  unit: string;
  emissionType: string;
  country?: string;
  consumptionAmount: number;
}

const EmissionFactorActions = {
  getCategories: async (): Promise<string[]> => {
    try {
      const res = await client.get("/categories");
      return res.data.data || [];
    } catch {
      return [];
    }
  },

  getScope1Categories: async (): Promise<string[]> => {
    try {
      const res = await client.get("/categories/scope1");
      return res.data.data || [];
    } catch {
      return [];
    }
  },

  getScope2Categories: async (): Promise<string[]> => {
    try {
      const res = await client.get("/categories/scope2");
      return res.data.data || [];
    } catch {
      return [];
    }
  },

  getScope3Categories: async (): Promise<string[]> => {
    try {
      const res = await client.get("/categories/scope3");
      return res.data.data || [];
    } catch {
      return [];
    }
  },

  getActivities: async (category: string, country?: string): Promise<string[]> => {
    try {
      const params: Record<string, string> = { category };
      if (country) params.country = country;
      const res = await client.get("/activities", { params });
      return Array.from(res.data.data || []);
    } catch {
      return [];
    }
  },

  getUnits: async (category: string, activity: string, country?: string): Promise<string[]> => {
    try {
      const params: Record<string, string> = { category, activity };
      if (country) params.country = country;
      const res = await client.get("/units", { params });
      return Array.from(res.data.data || []);
    } catch {
      return [];
    }
  },

  getCountries: async (category: string): Promise<string[]> => {
    try {
      const res = await client.get("/countries", { params: { category } });
      return Array.from(res.data.data || []);
    } catch {
      return [];
    }
  },

  getYears: async (): Promise<string[]> => {
    try {
      const res = await client.get("/years");
      return Array.from(res.data.data || []);
    } catch {
      return [];
    }
  },

  /**
   * Calculate tCO₂e emissions.
   * Returns null if no matching emission factor is found.
   */
  calculateEmissions: async (
    req: EmissionFactorCalculateRequest
  ): Promise<number | null> => {
    try {
      const res = await client.post("/calculate", req);
      if (res.data.success && res.data.data != null) {
        return res.data.data as number;
      }
      return null;
    } catch {
      return null;
    }
  },

  /**
   * Convenience: compute emissions from an entry object + scope + year.
   * Uses activity-data field keys: fuelType, consumptionAmount, unit.
   * Returns null if any required field is missing or EF not found.
   */
  calculateFromEntry: async (
    entry: Record<string, any>,
    scope: string,
    year: number,
    country?: string
  ): Promise<number | null> => {
    const category = SCOPE_TO_CATEGORY[scope];
    if (!category) return null;

    const activity = entry.fuelType || entry.tariffType || entry.refrigerantType || entry.activity;
    const unit = entry.unit;
    const consumptionAmount = parseFloat(entry.consumptionAmount);

    if (!activity || !unit || isNaN(consumptionAmount) || consumptionAmount <= 0) return null;

    return EmissionFactorActions.calculateEmissions({
      category,
      activity,
      year: String(year),
      unit,
      emissionType: "direct_location",
      country,
      consumptionAmount,
    });
  },
};

export default EmissionFactorActions;
