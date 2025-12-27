import createAxiosClient from "@/utils/axiosClient";
import { DashboardStats } from "./types";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/dashboard`);

const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await client.get("/stats");
    // Response format: { success: true, message: "Success", data: {...} }
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    // Return default values if no data
    return {
      stats: {
        totalEmissions: "0",
        dataQualityScore: "0%",
        dataCoverageScore: "0%",
        intensityPerEmployee: "0",
      },
      emissionsBreakdown: {
        scope1Percentage: 0,
        scope2Percentage: 0,
        scope3Percentage: 0,
        totalEmissions: "0",
        scopes: [],
      },
      userInfo: {
        firstName: "",
        lastName: "",
        companyName: "",
      },
    };
  } catch (error: any) {
    console.error("Error fetching dashboard stats:", error);
    // Return default values on error
    return {
      stats: {
        totalEmissions: "0",
        dataQualityScore: "0%",
        dataCoverageScore: "0%",
        intensityPerEmployee: "0",
      },
      emissionsBreakdown: {
        scope1Percentage: 0,
        scope2Percentage: 0,
        scope3Percentage: 0,
        totalEmissions: "0",
        scopes: [],
      },
      userInfo: {
        firstName: "",
        lastName: "",
        companyName: "",
      },
    };
  }
};

const DashboardActions = {
  getDashboardStats,
};

export default DashboardActions;
