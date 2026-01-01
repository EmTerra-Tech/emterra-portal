const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export interface ConfigurationRequest {
  configKey: string;
  configValue: any; // Can be any JSON-serializable object
}

export const ConfigurationActions = {
  async getAllConfigurations() {
    const response = await fetch(`${API_URL}/configuration`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch configurations');
    const data = await response.json();
    return data.data;
  },

  async getConfiguration(configKey: string) {
    const response = await fetch(`${API_URL}/configuration/${configKey}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch configuration');
    const data = await response.json();
    return data.data;
  },

  async saveConfiguration(request: ConfigurationRequest) {
    const response = await fetch(`${API_URL}/configuration`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Failed to save configuration');
    const data = await response.json();
    return data.data;
  },

  async deleteConfiguration(configKey: string) {
    const response = await fetch(`${API_URL}/configuration/${configKey}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete configuration');
  },
};
