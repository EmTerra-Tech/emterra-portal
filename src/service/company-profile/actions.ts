import createAxiosClient from "@/utils/axiosClient";
import { API_BASE_URL } from "@/utils/config";
import BranchActions from "../branch/actions";
import { AnnualData, CompanyProfile, Facility } from './types';

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

    // Mock data for Annual Data Timeline to match design
    const annualData: AnnualData[] = [
      {
        key: '1',
        year: '2023',
        employees: '45',
        revenue: '$2.4M',
        status: 'completed',
        locked: true
      }
    ];

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
    };

    const response = await BranchActions.createBranch(branchData);
    return response.data;
  } catch (error) {
    console.error("Error adding facility:", error);
    throw error;
  }
};

const CompanyActions = {
  fetchCompanyProfileWithDetails,
  addFacility,
};

export default CompanyActions;