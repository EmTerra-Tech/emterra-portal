// TypeScript types for Company Profile

export interface CompanyProfile {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  description: string;
  industry: string;
  foundedYear: number;
  headquarters: string;
}

// Types for Annual Data
export interface AnnualData {
  key: string;
  year: string;
  employees: string;
  revenue: string;
  status: string;
}

// Types for Facility
export interface Facility {
  name: string;
  type: string;
  location: string;
  size: string;
  employees: string;
  status: string;
}

// Types for Company Information
export interface CompanyInfo {
  companyName: string;
  industry: string;
  founded: number;
  headquarters: string;
  description: string;
}