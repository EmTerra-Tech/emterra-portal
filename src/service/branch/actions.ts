import createAxiosClient from "@/utils/axiosClient";
import { CreateBranchRequest, Branch } from "./types";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/branches`);

const createBranch = async (branchData: CreateBranchRequest) => {
  try {
    const response = await client.post("/signup", branchData);
    return response.data; // ApiResponse format: { success, message, data }
  } catch (error: any) {
    console.error("Error creating branch:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create facility"
    );
  }
};

const getAllBranches = async (): Promise<Branch[]> => {
  try {
    const response = await client.get("");
    // Response format: { success: true, message: "Success", data: [...] }
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return []; // Return empty array if no data
  } catch (error: any) {
    console.error("Error fetching branches:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch facilities"
    );
  }
};

const BranchActions = {
  createBranch,
  getAllBranches,
};

export default BranchActions;
