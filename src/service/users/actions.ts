import createAxiosClient from "@/utils/axiosClient";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/users`);

export type UserRole =
  | "ROLE_GLOBAL_ADMIN"
  | "ROLE_COMPANY_ADMIN"
  | "ROLE_COMPANY_VIEWER"
  | "ROLE_BRANCH_ADMIN"
  | "ROLE_BRANCH_EDITOR"
  | "ROLE_BRANCH_VIEWER";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  isActive: boolean;
  roles: UserRole[];
  assignedBranchIds?: string[];
  lastLoginAt?: string;
  createdAt?: string;
}

export interface UserInviteRequest {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  roles: UserRole[];
  assignedBranchIds?: string[];
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  isActive?: boolean;
  roles?: UserRole[];
  assignedBranchIds?: string[];
}

const UsersActions = {
  list: async (): Promise<User[]> => {
    try {
      const res = await client.get("");
      return res.data?.data ?? [];
    } catch (err) {
      console.error("Failed to fetch users", err);
      return [];
    }
  },

  invite: async (req: UserInviteRequest): Promise<User | null> => {
    const res = await client.post("/invite", req);
    return res.data?.data ?? null;
  },

  update: async (userId: string, req: UserUpdateRequest): Promise<User | null> => {
    const res = await client.put(`/${userId}`, req);
    return res.data?.data ?? null;
  },

  remove: async (userId: string): Promise<void> => {
    await client.delete(`/${userId}`);
  },
};

export default UsersActions;
