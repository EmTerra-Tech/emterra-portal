import axios from "axios";

// Mock API for fetching all stationary combustion entries for a facility

export type EntryType = "activity" | "spend" | "emissions";

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
   * Fetch all stationary combustion entries for a facility (mock implementation)
   */
  getCombustionEntries: async (): Promise<CombustionEntry[]> => {
    // Simulate API delay and return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            type: "activity",
            data: {
              id: 1,
              fuelType: "Natural Gas",
              amount: "1250",
              unit: "m³ (cubic meters)",
              equipment: "Boiler",
              notes: "Main heating system for the headquarters building",
            },
          },
          {
            type: "spend",
            data: {
              id: 2,
              supplier: "Acme Energy",
              amount: "5000",
              currency: "USD",
              category: "Fuel Purchase",
              description: "Natural gas for Q1",
            },
          },
          {
            type: "emissions",
            data: {
              id: 3,
              emissionsValue: 3200,
              unit: "kg CO₂e",
              methodology: "Default emission factor",
              description: "Calculated for Q1 combustion",
            },
          },
        ]);
      }, 500);
    });
  },

  /**
   * POST API to add a stationary combustion entry (real endpoint)
   * Endpoint: /emission/scope1/stationary-combustion
   * Example body (from Postman):
   * {
   *   "branchId": 1,
   *   "year": 2024,
   *   "scope": "SCOPE1_STATIONARY_COMBUSTION",
   *   "availability": "YES",
   *   "state": "DRAFT",
   *   "data": { ... }
   * }
   */
  postCombustionEntry: async (entries: any[]): Promise<{ success: boolean }> => {
    // Replace with actual branchId, year, and data as needed
    const payload = {
      branchId:  1,
      year:  new Date().getFullYear(),
      scope: "SCOPE1_STATIONARY_COMBUSTION",
      availability: "YES",
      state: "DRAFT",
      data: entries,
    };
    // Replace baseUrl with your actual API base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const url = `${baseUrl}/emission/scope1/stationary-combustion`;
    // This is a real API call, update headers/auth as needed
    const response = await axios.post(url, payload);
    return response.data;
  },
};

export default EmissionCollectionActions;
