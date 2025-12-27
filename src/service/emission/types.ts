export type ScopeType =
  | "SCOPE1_STATIONARY_COMBUSTION"
  | "SCOPE1_MOBILE_COMBUSTION"
  | "SCOPE1_FUGITIVE_EMISSIONS"
  | "SCOPE2_PURCHASED_ELECTRICITY"
  | "SCOPE2_PURCHASED_STEAM"
  | "SCOPE2_PURCHASED_COOLING"
  | "SCOPE2_HEATING_COOLING";

export type AvailabilityType = "YES" | "NOT_AVAILABLE" | "NOT_APPLICABLE";

export type DataState = "DRAFT" | "SUBMITTED" | "APPROVED";

export interface EmissionDataRequest {
  branchId: number;
  year: number;
  scope: ScopeType;
  availability: AvailabilityType;
  state: DataState;
  data: Record<string, any>;
}
