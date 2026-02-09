import createAxiosClient from "@/utils/axiosClient";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}`);

export interface OnboardingStatus {
  step1Complete: boolean; // Has assessment year + at least one facility
  step2Complete: boolean; // Has at least one emission data entry
  step3Complete: boolean; // Has generated at least one report
  currentStep: 1 | 2 | 3;
  companyProfile: {
    hasAssessmentYear: boolean;
    hasFacilities: boolean;
    facilitiesCount: number;
  };
  dataCollection: {
    hasAnyData: boolean;
    totalEntries: number;
    facilitiesWithData: number;
  };
  reports: {
    hasReports: boolean;
    reportCount: number;
  };
}

const OnboardingActions = {
  /**
   * Get onboarding status for the current user's company
   */
  getStatus: async (): Promise<OnboardingStatus> => {
    try {
      const response = await client.get("/onboarding/status");
      if (response.data.success) {
        return response.data.data;
      }
      // Return default status if API fails
      return {
        step1Complete: false,
        step2Complete: false,
        step3Complete: false,
        currentStep: 1,
        companyProfile: {
          hasAssessmentYear: false,
          hasFacilities: false,
          facilitiesCount: 0,
        },
        dataCollection: {
          hasAnyData: false,
          totalEntries: 0,
          facilitiesWithData: 0,
        },
        reports: {
          hasReports: false,
          reportCount: 0,
        },
      };
    } catch (error: any) {
      console.error("Error fetching onboarding status:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch onboarding status"
      );
    }
  },
};

export default OnboardingActions;
