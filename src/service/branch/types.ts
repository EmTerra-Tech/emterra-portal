export type FacilityType =
  | "HEADQUARTERS"
  | "MANUFACTURING"
  | "WAREHOUSE"
  | "OFFICE"
  | "RD"
  | "RETAIL"
  | "DATACENTER"
  | "OTHER";

export type SpaceType = "SQFT" | "SQM";

export interface CreateBranchRequest {
  name: string;
  address: string;
  city: string;
  country: string;
  zipcode: string;
  description?: string;
  type: FacilityType;
  officeSpace: number;
  spaceType: SpaceType;
  empCount: number;
  phone?: string;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  zipcode: string;
  description?: string;
  type: FacilityType;
  officeSpace: number;
  spaceType: SpaceType;
  empCount: number;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
