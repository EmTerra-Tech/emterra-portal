const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export interface ReportGenerateRequest {
  reportType: 'EMISSIONS_SUMMARY' | 'SCOPE_1' | 'SCOPE_2' | 'SCOPE_3' | 'DATA_QUALITY' | 'COMPLIANCE';
  reportYear: number;
  branchId?: number;
  fileFormat: 'PDF' | 'EXCEL' | 'CSV';
  parameters?: {
    startMonth?: string;
    endMonth?: string;
    includeCharts?: boolean;
    includeRawData?: boolean;
  };
}

export const ReportsActions = {
  async generateReport(request: ReportGenerateRequest) {
    const response = await fetch(`${API_URL}/reports/generate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Failed to generate report');
    const data = await response.json();
    return data.data;
  },

  async getAllReports(branchId?: number) {
    const url = branchId
      ? `${API_URL}/reports?branchId=${branchId}`
      : `${API_URL}/reports`;

    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch reports');
    const data = await response.json();
    return data.data;
  },

  async getReport(reportId: number) {
    const response = await fetch(`${API_URL}/reports/${reportId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch report');
    const data = await response.json();
    return data.data;
  },

  async deleteReport(reportId: number) {
    const response = await fetch(`${API_URL}/reports/${reportId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete report');
  },
};
