"use client";

import { Select } from "antd";
import { Description, Header, Title, YearSelect } from "./styles";

interface DataInputHeaderProps {
  scope: string;
}

// Map scope types to their display information
const scopeInfo: Record<string, { icon: string; title: string; description: string }> = {
  SCOPE1_STATIONARY_COMBUSTION: {
    icon: "🔥",
    title: "Stationary Combustion Data",
    description: "Add emissions data for fuel combustion in stationary equipment",
  },
  SCOPE1_MOBILE_COMBUSTION: {
    icon: "🚗",
    title: "Mobile Combustion Data",
    description: "Add emissions data from vehicles and mobile sources",
  },
  SCOPE1_FUGITIVE_EMISSIONS: {
    icon: "❄️",
    title: "Fugitive Emissions Data",
    description: "Add emissions data from refrigerants and other fugitive sources",
  },
  SCOPE1_PROCESS_EMISSIONS: {
    icon: "⚗️",
    title: "Process Emissions Data",
    description: "Add emissions data from industrial processes",
  },
  SCOPE2_PURCHASED_ELECTRICITY: {
    icon: "🏢",
    title: "Purchased Electricity Data",
    description: "Add emissions data from purchased electricity consumption",
  },
  SCOPE2_HEATING_COOLING: {
    icon: "🔥",
    title: "Purchased Heating/Cooling Data",
    description: "Add emissions data from purchased heating and cooling",
  },
  SCOPE2_PURCHASED_STEAM: {
    icon: "💨",
    title: "Purchased Steam Data",
    description: "Add emissions data from purchased steam",
  },
  SCOPE2_PURCHASED_COOLING: {
    icon: "❄️",
    title: "Purchased Cooling Data",
    description: "Add emissions data from purchased cooling",
  },
  SCOPE3_BUSINESS_TRAVEL: {
    icon: "✈️",
    title: "Business Travel Data",
    description: "Add emissions data from employee business travel",
  },
  SCOPE3_EMPLOYEE_COMMUTING: {
    icon: "🚇",
    title: "Employee Commuting Data",
    description: "Add emissions data from employee commuting",
  },
  SCOPE3_PURCHASED_GOODS: {
    icon: "📦",
    title: "Purchased Goods & Services Data",
    description: "Add emissions data from purchased goods and services",
  },
  SCOPE3_WASTE: {
    icon: "🗑️",
    title: "Waste Generated in Operations Data",
    description: "Add emissions data from waste disposal and treatment",
  },
};

const DataInputHeader = ({ scope }: DataInputHeaderProps) => {
  const info = scopeInfo[scope] || {
    icon: "📊",
    title: "Emissions Data",
    description: "Add emissions data for this category",
  };

  const yearOptions = [
    { value: 2025, label: '2025' },
    { value: 2024, label: '2024' },
    { value: 2023, label: '2023' },
    { value: 2022, label: '2022' },
    { value: 2021, label: '2021' },
  ];

  return (
    <div className={Header}>
      <div>
        <h2 className={Title}>
          <span>{info.icon}</span> {info.title}
        </h2>
        <p className={Description}>{info.description}</p>
      </div>
      <Select
        className={YearSelect}
        defaultValue={2025}
        options={yearOptions}
      />
    </div>
  );
};

export default DataInputHeader;

