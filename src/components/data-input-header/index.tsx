"use client";

import { Select } from "antd";
import { useState, useEffect } from "react";
import EmissionsActions from "@/service/emissions/actions";
import { Description, Header, Title, YearSelect } from "./styles";

interface DataInputHeaderProps {
  scope: string;
  selectedYear?: number;
  onYearChange?: (year: number) => void;
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

const DataInputHeader = ({ scope, selectedYear, onYearChange }: DataInputHeaderProps) => {
  const currentYear = new Date().getFullYear();
  const info = scopeInfo[scope] || {
    icon: "📊",
    title: "Emissions Data",
    description: "Add emissions data for this category",
  };

  const [availableYears, setAvailableYears] = useState<number[]>([currentYear]);
  const [internalYear, setInternalYear] = useState<number>(currentYear);
  const year = selectedYear ?? internalYear;
  const handleChange = (y: number) => {
    setInternalYear(y);
    onYearChange?.(y);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const years = await EmissionsActions.getAvailableYears(scope);
      if (cancelled) return;
      const merged = years.length > 0 ? years : [currentYear];
      setAvailableYears(merged);
      if (selectedYear === undefined) {
        setInternalYear(currentYear);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentYear, scope, selectedYear]);

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
        value={year}
        onChange={handleChange}
        options={availableYears.map((y) => ({
          value: y,
          label: y === currentYear ? `${y} (Current)` : `${y}`,
        }))}
      />
    </div>
  );
};

export default DataInputHeader;

