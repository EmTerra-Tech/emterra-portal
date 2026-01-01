const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export interface UserInviteRequest {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle?: string;
  roles: string[];
  assignedBranchIds?: number[];
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  roles?: string[];
  assignedBranchIds?: number[];
  isActive?: boolean;
}

export interface UserSettingsRequest {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  avatarUrl?: string;
  notificationPreferences?: {
    email?: boolean;
    dataReminders?: boolean;
    reportGeneration?: boolean;
    weeklyDigest?: boolean;
  };
}

export const UserActions = {
  async getAllUsers() {
    const response = await fetch(`${API_URL}/users`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    return data.data;
  },

  async inviteUser(request: UserInviteRequest) {
    const response = await fetch(`${API_URL}/users/invite`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Failed to invite user');
    const data = await response.json();
    return data.data;
  },

  async updateUser(userId: number, request: UserUpdateRequest) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Failed to update user');
    const data = await response.json();
    return data.data;
  },

  async deleteUser(userId: number) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete user');
  },

  async updateSettings(request: UserSettingsRequest) {
    const response = await fetch(`${API_URL}/users/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Failed to update settings');
    const data = await response.json();
    return data.data;
  },
};
