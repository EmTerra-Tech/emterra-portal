import React from "react";
import {
  CarFilled,
  FireFilled,
  ThunderboltFilled,
  CloudFilled,
  ApiFilled,
} from "@ant-design/icons";

export interface CategoryColumn {
  /** Header label (uppercased automatically by the table). */
  label: string;
  /** Width as a CSS string ("20%", "120px", ...). */
  width: string;
  /** Field key to read from the entry's `data`. Falls back to other keys in order. */
  fields: string[];
  /** Optional formatter — receives the raw value, returns a React node. */
  render?: "number" | "method" | "text";
}

export interface CategoryConfig {
  scope: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  icon: React.ReactNode;
  iconColor: string;
  availabilityQuestion: string;
  /** Columns shown in the per-facility expanded entries table. */
  columns: CategoryColumn[];
}

const FIRE = React.createElement(FireFilled);
const CAR = React.createElement(CarFilled);
const SNOW = React.createElement(CloudFilled);
const BOLT = React.createElement(ThunderboltFilled);
const STEAM = React.createElement(ApiFilled);

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  SCOPE1_STATIONARY_COMBUSTION: {
    scope: "SCOPE1_STATIONARY_COMBUSTION",
    title: "Stationary Combustion Data",
    description: "Add emissions data for fuel combustion in stationary equipment",
    breadcrumbLabel: "Stationary Combustion",
    icon: FIRE,
    iconColor: "#10b981",
    availabilityQuestion: "Do you have stationary combustion data for this facility?",
    columns: [
      { label: "Fuel Type", width: "20%", fields: ["fuelType", "fuel_type", "item"], render: "text" },
      { label: "Amount", width: "15%", fields: ["consumptionAmount", "amount", "total_amount"], render: "number" },
      { label: "Unit", width: "15%", fields: ["unit"], render: "text" },
      { label: "Equipment", width: "30%", fields: ["equipmentType", "equipment"], render: "text" },
      { label: "Method", width: "20%", fields: ["calculationMethod"], render: "method" },
    ],
  },
  SCOPE1_MOBILE_COMBUSTION: {
    scope: "SCOPE1_MOBILE_COMBUSTION",
    title: "Mobile Combustion Data",
    description: "Add emissions data for company-owned or operated vehicles",
    breadcrumbLabel: "Mobile Combustion",
    icon: CAR,
    iconColor: "#0ea5e9",
    availabilityQuestion: "Do you have mobile combustion data for this facility?",
    columns: [
      { label: "Source / Vehicle", width: "25%", fields: ["vehicleType", "source", "fuelType"], render: "text" },
      { label: "Type / Category", width: "20%", fields: ["fuelType", "category"], render: "text" },
      { label: "Amount", width: "15%", fields: ["consumptionAmount", "distanceTravelled", "amount"], render: "number" },
      { label: "Unit", width: "15%", fields: ["unit"], render: "text" },
      { label: "Method", width: "25%", fields: ["calculationMethod"], render: "method" },
    ],
  },
  SCOPE1_FUGITIVE_EMISSIONS: {
    scope: "SCOPE1_FUGITIVE_EMISSIONS",
    title: "Refrigerant Data",
    description: "Add emissions data for refrigerant leakage and top-ups",
    breadcrumbLabel: "Refrigerants",
    icon: SNOW,
    iconColor: "#06b6d4",
    availabilityQuestion: "Do you have refrigerant data for this facility?",
    columns: [
      { label: "Refrigerant / Source", width: "25%", fields: ["refrigerantType", "source"], render: "text" },
      { label: "Activity Type", width: "25%", fields: ["activity", "activityType"], render: "text" },
      { label: "Amount", width: "15%", fields: ["consumptionAmount", "amount", "amountRecharged"], render: "number" },
      { label: "Unit", width: "15%", fields: ["unit"], render: "text" },
      { label: "Method", width: "20%", fields: ["calculationMethod"], render: "method" },
    ],
  },
  SCOPE2_PURCHASED_ELECTRICITY: {
    scope: "SCOPE2_PURCHASED_ELECTRICITY",
    title: "Purchased Electricity Data",
    description: "Add emissions data for purchased electricity consumption",
    breadcrumbLabel: "Purchased Electricity (Facilities)",
    icon: BOLT,
    iconColor: "#3b82f6",
    availabilityQuestion: "Do you have electricity consumption data for this facility?",
    columns: [
      { label: "Source", width: "20%", fields: ["tariffType", "electricitySource", "source"], render: "text" },
      { label: "Amount", width: "15%", fields: ["consumptionAmount", "amount"], render: "number" },
      { label: "Unit", width: "10%", fields: ["unit"], render: "text" },
      { label: "Country", width: "15%", fields: ["country"], render: "text" },
      { label: "EGRID / EF", width: "20%", fields: ["supplierEmissionFactor", "emissionFactor"], render: "text" },
      { label: "Method", width: "20%", fields: ["calculationMethod"], render: "method" },
    ],
  },
  SCOPE2_PURCHASED_ELECTRICITY_VEHICLES: {
    scope: "SCOPE2_PURCHASED_ELECTRICITY_VEHICLES",
    title: "Purchased Electricity (Vehicles)",
    description: "Add emissions data for electric vehicle charging",
    breadcrumbLabel: "Purchased Electricity (Vehicles)",
    icon: BOLT,
    iconColor: "#0d9488",
    availabilityQuestion: "Do you have EV charging data for this facility?",
    columns: [
      { label: "Source / Category", width: "30%", fields: ["activity", "source", "vehicleType"], render: "text" },
      { label: "Amount", width: "20%", fields: ["consumptionAmount", "distanceTravelled", "amount"], render: "number" },
      { label: "Unit", width: "20%", fields: ["unit"], render: "text" },
      { label: "Method", width: "30%", fields: ["calculationMethod"], render: "method" },
    ],
  },
  SCOPE2_HEATING_COOLING: {
    scope: "SCOPE2_HEATING_COOLING",
    title: "Purchased Heat & Steam Data",
    description: "Add emissions data for purchased heat, steam, and cooling",
    breadcrumbLabel: "Purchased Heat & Steam",
    icon: STEAM,
    iconColor: "#8b5cf6",
    availabilityQuestion: "Do you have purchased heat/steam data for this facility?",
    columns: [
      { label: "Energy Type / Source", width: "25%", fields: ["energyType", "source"], render: "text" },
      { label: "Source / Provider", width: "25%", fields: ["sourceType", "supplier", "provider"], render: "text" },
      { label: "Amount", width: "15%", fields: ["consumptionAmount", "amount"], render: "number" },
      { label: "Unit", width: "15%", fields: ["unit"], render: "text" },
      { label: "Method", width: "20%", fields: ["calculationMethod"], render: "method" },
    ],
  },
  SCOPE2_PURCHASED_STEAM: {
    scope: "SCOPE2_PURCHASED_STEAM",
    title: "Purchased Steam Data",
    description: "Add emissions data from purchased steam",
    breadcrumbLabel: "Purchased Steam",
    icon: STEAM,
    iconColor: "#a855f7",
    availabilityQuestion: "Do you have purchased steam data for this facility?",
    columns: [
      { label: "Energy Type", width: "25%", fields: ["energyType", "source"], render: "text" },
      { label: "Provider", width: "25%", fields: ["supplier", "provider"], render: "text" },
      { label: "Amount", width: "15%", fields: ["consumptionAmount", "amount"], render: "number" },
      { label: "Unit", width: "15%", fields: ["unit"], render: "text" },
      { label: "Method", width: "20%", fields: ["calculationMethod"], render: "method" },
    ],
  },
};

/** Map a route slug pair to its canonical scope enum value. */
export const ROUTE_TO_SCOPE: Record<string, Record<string, string>> = {
  "scope-1": {
    "stationary-combustion": "SCOPE1_STATIONARY_COMBUSTION",
    "mobile-combustion": "SCOPE1_MOBILE_COMBUSTION",
    "refrigerants": "SCOPE1_FUGITIVE_EMISSIONS",
    "process-emissions": "SCOPE1_PROCESS_EMISSIONS",
  },
  "scope-2": {
    "purchased-electricity-facilities": "SCOPE2_PURCHASED_ELECTRICITY",
    "purchased-electricity-vehicles": "SCOPE2_PURCHASED_ELECTRICITY_VEHICLES",
    "purchased-heat-and-steam": "SCOPE2_HEATING_COOLING",
    "purchased-heating": "SCOPE2_HEATING_COOLING",
    "purchased-steam": "SCOPE2_PURCHASED_STEAM",
    "purchased-cooling": "SCOPE2_PURCHASED_COOLING",
  },
  "scope-3": {
    "business-travel": "SCOPE3_BUSINESS_TRAVEL",
    "employee-commuting": "SCOPE3_EMPLOYEE_COMMUTING",
    "purchased-goods": "SCOPE3_PURCHASED_GOODS",
    "waste": "SCOPE3_WASTE",
  },
};
