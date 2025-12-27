export interface DashboardStats {
  stats: StatsData;
  emissionsBreakdown: EmissionsBreakdown;
  userInfo: UserInfo;
}

export interface StatsData {
  totalEmissions: string;
  dataQualityScore: string;
  dataCoverageScore: string;
  intensityPerEmployee: string;
}

export interface EmissionsBreakdown {
  scope1Percentage: number;
  scope2Percentage: number;
  scope3Percentage: number;
  totalEmissions: string;
  scopes: ScopeData[];
}

export interface ScopeData {
  scope: string;
  percentage: number;
  value: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  companyName: string;
}
