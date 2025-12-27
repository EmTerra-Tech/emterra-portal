import createAxiosClient from "@/utils/axiosClient";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/form-schema`);

export interface SchemaField {
  inputKey: string;
  inputLabel: string;
  inputType: "text" | "number" | "select" | "textarea";
  required: boolean;
  placeholder?: string;
  enumClass?: string;
  inputValues?: Array<{ value: string; label: string }>;
}

const SchemaActions = {
  /**
   * Fetch schema for a given scope and availability
   */
  getSchema: async (
    scope: string,
    availability: string,
    dataType?: string
  ): Promise<SchemaField[]> => {
    try {
      const url = dataType
        ? `/${scope}/${availability}?dataType=${dataType}`
        : `/${scope}/${availability}`;
      console.log(`Fetching schema from: /form-schema${url}`);
      const response = await client.get(url);
      console.log("Schema API response:", response);

      // Backend wraps response in {success, message, data}
      if (response.data.success && Array.isArray(response.data.data)) {
        console.log("Schema fields found:", response.data.data.length);
        return response.data.data;
      }

      // Fallback: check if response.data itself is an array
      if (Array.isArray(response.data)) {
        console.log("Schema fields found (direct array):", response.data.length);
        return response.data;
      }

      console.warn("Schema response is not in expected format:", response.data);
      return [];
    } catch (error: any) {
      console.error("Error fetching schema:", error);
      console.error("Error details:", error.response?.data);
      return [];
    }
  },
};

export default SchemaActions;
