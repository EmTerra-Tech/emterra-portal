import createAxiosClient from "@/utils/axiosClient";
import { API_BASE_URL } from "@/utils/config";
import BranchActions from "../branch/actions";
import { AnnualData, CompanyProfile, Facility } from './types';

const annualDataClient = createAxiosClient(`${API_BASE_URL}/annual-data`);

const client = createAxiosClient(API_BASE_URL);

// Function to fetch company profile data with details
export const fetchCompanyProfileWithDetails = async (): Promise<{
  companyProfile: CompanyProfile;
  annualData: AnnualData[];
  facilities: Facility[];
}> => {
  try {
    // Fetch user profile (includes company info)
    const userClient = createAxiosClient(`${API_BASE_URL}/users`);
    const profileResponse = await userClient.get("/profile");
    const profileData = profileResponse.data.data;

    // Fetch facilities (branches)
    const branches = await BranchActions.getAllBranches();

    // Map backend data to frontend format
    const companyProfile: CompanyProfile = {
      companyName: profileData.company.name,
      email: profileData.email,
      phone: profileData.company.phone || "",
      address: profileData.company.address || "",
      website: profileData.company.website || "",
      description: profileData.company.description || "",
      industry: profileData.company.industry || "",
      foundedYear: profileData.company.foundedYear || 0,
      headquarters: profileData.company.headquarters || "",
    };

    // Map facilities
    const facilities: Facility[] = branches.map((branch) => ({
      name: branch.name,
      type: branch.type,
      location: `${branch.city}, ${branch.country}`,
      size: `${branch.officeSpace} ${branch.spaceType}`,
      employees: `${branch.empCount} employees`,
      status: branch.isActive ? "active" : "inactive",
    }));

    // Fetch annual data from backend
    let annualData: AnnualData[] = [];
    try {
      const annualResponse = await annualDataClient.get("");
      const annualDataFromBackend = annualResponse.data.data;

      annualData = annualDataFromBackend.map((item: any) => ({
        key: item.id.toString(),
        year: item.assessmentYear.toString(),
        employees: item.fte.toString(),
        revenue: item.revenue ? `${item.currency} ${item.revenue.toLocaleString()}` : 'N/A',
        status: item.status.toLowerCase() === 'completed' ? 'completed' : 'progress',
        locked: item.isLocked
      }));
    } catch (error) {
      console.error("Error fetching annual data:", error);
      // Return empty array if no data exists yet
    }

    return {
      companyProfile,
      annualData,
      facilities,
    };
  } catch (error) {
    console.error("Error fetching company profile with details:", error);
    throw error;
  }
};

const addFacility = async (facilityData: {
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  zipcode: string;
  description?: string;
  type: string;
  officeSpace: number;
  spaceType: string;
  empCount: number;
  assessmentYear: number;
}): Promise<void> => {
  try {
    // Map form values to backend format
    const branchData = {
      name: facilityData.name,
      address: facilityData.address,
      city: facilityData.city,
      country: facilityData.country,
      zipcode: facilityData.zipcode,
      description: facilityData.description || "",
      type: facilityData.type as any,
      officeSpace: facilityData.officeSpace,
      spaceType: facilityData.spaceType as any,
      empCount: facilityData.empCount,
      phone: facilityData.phone || "",
      assessmentYear: facilityData.assessmentYear,
    };

    const response = await BranchActions.createBranch(branchData);
    return response.data;
  } catch (error) {
    console.error("Error adding facility:", error);
    throw error;
  }
};

const addAnnualData = async (data: {
  assessmentYear: number;
  revenue: number;
  currency: string;
  fte: number;
}): Promise<void> => {
  try {
    await annualDataClient.post("", data);
  } catch (error) {
    console.error("Error adding annual data:", error);
    throw error;
  }
};

const CompanyActions = {
  fetchCompanyProfileWithDetails,
  addFacility,
  addAnnualData,
};

export default CompanyActions;