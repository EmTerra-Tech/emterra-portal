import createAxiosClient from "@/utils/axiosClient";
import { API_BASE_URL } from "@/utils/config";

const client = createAxiosClient(`${API_BASE_URL}/reports`);

export type ReportType =
  | "EMISSIONS_SUMMARY"
  | "SCOPE_1"
  | "SCOPE_2"
  | "SCOPE_3"
  | "DATA_QUALITY"
  | "COMPLIANCE";

export type FileFormat = "PDF" | "EXCEL" | "CSV";

export interface Report {
  id: string;
  reportType: ReportType;
  reportYear: number;
  branchId?: string;
  fileFormat: FileFormat;
  fileUrl?: string;
  fileSizeBytes?: number;
  status: "PENDING" | "GENERATING" | "COMPLETED" | "FAILED";
  errorMessage?: string;
  completedAt?: string;
  createdAt: string;
}

export interface ReportGenerateRequest {
  reportType: ReportType;
  reportYear: number;
  branchId?: string;
  fileFormat: FileFormat;
  parameters?: Record<string, unknown>;
}

export interface ReportSummaryByScope {
  scope: string;
  totalConsumption: number;
  totalEmissionsTco2e: number;
  entryCount: number;
}

export interface ReportSummary {
  year: number;
  totalConsumption: number;
  totalEmissionsTco2e: number;
  entryCount: number;
  facilitiesCovered: number;
  byScope: ReportSummaryByScope[];
}

const ReportsActions = {
  /**
   * List reports for the current company. If `year` is omitted the BE
   * defaults to the current calendar year.
   */
  list: async (year?: number, branchId?: string): Promise<Report[]> => {
    try {
      const params: Record<string, string> = {};
      if (year !== undefined) params.year = String(year);
      if (branchId) params.branchId = branchId;
      const res = await client.get("", { params });
      return res.data?.data ?? [];
    } catch (err) {
      console.error("Failed to fetch reports", err);
      return [];
    }
  },

  summary: async (year?: number): Promise<ReportSummary | null> => {
    try {
      const params: Record<string, string> = {};
      if (year !== undefined) params.year = String(year);
      const res = await client.get("/summary", { params });
      return res.data?.data ?? null;
    } catch (err) {
      console.error("Failed to fetch report summary", err);
      return null;
    }
  },

  generate: async (req: ReportGenerateRequest): Promise<Report | null> => {
    try {
      const res = await client.post("/generate", req);
      return res.data?.data ?? null;
    } catch (err) {
      console.error("Failed to generate report", err);
      throw err;
    }
  },

  get: async (reportId: string): Promise<Report | null> => {
    try {
      const res = await client.get(`/${reportId}`);
      return res.data?.data ?? null;
    } catch (err) {
      console.error("Failed to fetch report", err);
      return null;
    }
  },

  remove: async (reportId: string): Promise<void> => {
    await client.delete(`/${reportId}`);
  },

  /**
   * Stream the report file and trigger a browser download.
   */
  download: async (report: Report): Promise<void> => {
    const res = await client.get(`/${report.id}/download`, { responseType: "blob" });
    const blob = res.data as Blob;
    const ext = (report.fileFormat || "CSV").toLowerCase();
    const filename = `${report.reportType}_${report.reportYear}.${ext === "excel" ? "xlsx" : ext}`;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  },
};

export default ReportsActions;
