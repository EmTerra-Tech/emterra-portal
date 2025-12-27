import createAxiosClient from "@/utils/axiosClient";
import { AnnualData, CompanyProfile, Facility } from './types';

const client = createAxiosClient(process.env.BE_BASE_URL + "/company-profile" || "http://localhost:4000/api/company-profile");

// Function to fetch company profile data with details
export const fetchCompanyProfileWithDetails = async (): Promise<{
  companyProfile: CompanyProfile;
  annualData: AnnualData[];
  facilities: Facility[];
}> => {
  try {
    // Uncomment the following lines when the actual API is ready
    // const response = await client.get("/profile-with-details");
    // return response.data;

    // Mock data simulating the API response
    const mockResponse = {
      companyProfile: {
        companyName: "GreenTech Solutions",
        email: "admin@greentech.com",
        phone: "+1-415-555-0100",
        address: "123 Green Street, San Francisco, USA",
        website: "https://greentech.com",
        description: "Leading provider of sustainable technology solutions",
        industry: "Technology",
        foundedYear: 2020,
        headquarters: "San Francisco",
      },
      annualData: [
        { key: "1", year: "2024", employees: "2,450", revenue: "$180M", status: "progress" },
        { key: "2", year: "2023", employees: "2,268", revenue: "$161M", status: "complete" },
        { key: "3", year: "2022", employees: "2,100", revenue: "$145M", status: "complete" },
      ],
      facilities: [
        { name: "Seattle HQ", type: "Headquarters & Manufacturing", location: "Seattle, WA", size: "45,000 sq ft", employees: "850 employees", status: "active" },
        { name: "Austin Plant", type: "Manufacturing Facility", location: "Austin, TX", size: "78,000 sq ft", employees: "1,200 employees", status: "active" },
        { name: "Phoenix R&D", type: "Research & Development", location: "Phoenix, AZ", size: "25,000 sq ft", employees: "400 employees", status: "active" },
      ],
    };

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse), 500); // Simulate API delay
    });
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
  phone: string;
  zipcode: string;
  description: string;
  type: string;
  officeSpace: number;
  spaceType: string;
  empCount: number;
}): Promise<void> => {
  try {
    // Uncomment the following lines when the actual API is ready
    // const response = await client.post("/branches/signup", facilityData);
    // return response.data;

    console.log("Mock API call to add facility:", facilityData);
    return new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
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