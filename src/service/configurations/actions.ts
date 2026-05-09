import createAxiosClient from "@/utils/axiosClient";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/configuration`);

export interface Configuration<T = unknown> {
  configKey: string;
  configValue: T;
  updatedAt?: string;
}

const ConfigurationsActions = {
  list: async (): Promise<Configuration[]> => {
    try {
      const res = await client.get("");
      return res.data?.data ?? [];
    } catch (err) {
      console.error("Failed to list configuration", err);
      return [];
    }
  },

  get: async <T = unknown>(configKey: string): Promise<Configuration<T> | null> => {
    try {
      const res = await client.get(`/${encodeURIComponent(configKey)}`);
      return res.data?.data ?? null;
    } catch (err: any) {
      if (err?.response?.status === 404) return null;
      console.error(`Failed to get configuration ${configKey}`, err);
      return null;
    }
  },

  save: async <T = unknown>(configKey: string, configValue: T): Promise<Configuration<T> | null> => {
    const res = await client.post("", { configKey, configValue });
    return res.data?.data ?? null;
  },

  remove: async (configKey: string): Promise<void> => {
    await client.delete(`/${encodeURIComponent(configKey)}`);
  },
};

export default ConfigurationsActions;
