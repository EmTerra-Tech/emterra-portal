/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ActionButtons from "../action-buttons";
import DataCollectionHeader from "../data-collection-header";
import ScopeSection from "../scope-section";
import ValidationSummary from "../validation-summary";

const containerStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const scopesData = [
  {
    id: "scope1",
    title: "Scope 1 - Direct Emissions",
    description:
      "Direct greenhouse gas emissions from sources owned or controlled by your organization",
    icon: "🔥",
    progress: 65,
    iconBg: "linear-gradient(135deg, #ef4444, #dc2626)",
    categories: [
      {
        id: "stationary-combustion",
        title: "Stationary Combustion",
        icon: "🔥",
        emissions: "1.2 tCO₂e",
        dataQuality: "High",
        coverage: 80,
        colorClass: "stationary-combustion",
        headerBg: "linear-gradient(135deg, #2dd4bf, #059669)",
        route: "/data-collection/scope-1/stationary-combustion",
      },
      {
        id: "mobile-combustion",
        title: "Mobile Combustion",
        icon: "🚗",
        emissions: "0.8 tCO₂e",
        dataQuality: "Medium",
        coverage: 65,
        colorClass: "mobile-combustion",
        headerBg: "linear-gradient(135deg, #f59e0b, #d97706)",
        route: "/data-collection/scope-1/mobile-combustion",
      },
      {
        id: "refrigerants",
        title: "Refrigerants",
        icon: "❄️",
        emissions: "0.1 tCO₂e",
        dataQuality: "Low",
        coverage: 25,
        colorClass: "refrigerants",
        headerBg: "linear-gradient(135deg, #06b6d4, #0891b2)",
        route: "/data-collection/scope-1/refrigerants",
      },
      {
        id: "process-emissions",
        title: "Process Emissions",
        icon: "⚗️",
        emissions: "2.4 tCO₂e",
        dataQuality: "High",
        coverage: 90,
        colorClass: "process-emissions",
        headerBg: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        route: "/data-collection/scope-1/process-emissions",
      },
    ],
  },
  {
    id: "scope2",
    title: "Scope 2 - Indirect Energy Emissions",
    description:
      "Emissions from purchased electricity, steam, heating, and cooling",
    icon: "⚡",
    progress: 83,
    iconBg: "linear-gradient(135deg, #f59e0b, #d97706)",
    categories: [
      {
        id: "purchased-electricity-facilities",
        title: "Purchased Electricity (Facilities)",
        icon: "🏢",
        emissions: "8.4 tCO₂e",
        dataQuality: "High",
        coverage: 95,
        colorClass: "purchased-electricity-facilities",
        headerBg: "linear-gradient(135deg, #2dd4bf, #059669)",
        route: "/data-collection/scope-2/purchased-electricity-facilities",
      },
      {
        id: "purchased-electricity-vehicles",
        title: "Purchased Electricity (Vehicles)",
        icon: "🔌",
        emissions: "0.3 tCO₂e",
        dataQuality: "Medium",
        coverage: 70,
        colorClass: "purchased-electricity-vehicles",
        headerBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
        route: "/data-collection/scope-2/purchased-electricity-vehicles",
      },
      {
        id: "purchased-heating",
        title: "Purchased Heating",
        icon: "🔥",
        emissions: "1.8 tCO₂e",
        dataQuality: "High",
        coverage: 85,
        colorClass: "purchased-heating",
        headerBg: "linear-gradient(135deg, #f59e0b, #d97706)",
        route: "/data-collection/scope-2/purchased-heating",
      },
    ],
  },
  {
    id: "scope3",
    title: "Scope 3 - Other Indirect Emissions",
    description:
      "All indirect emissions in your value chain (upstream and downstream)",
    icon: "🌐",
    progress: 42,
    iconBg: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    categories: [
      {
        id: "business-travel",
        title: "Business Travel",
        icon: "✈️",
        emissions: "12.4 tCO₂e",
        dataQuality: "Medium",
        coverage: 75,
        colorClass: "business-travel",
        headerBg: "linear-gradient(135deg, #10b981, #059669)",
        route: "/data-collection/scope-3/business-travel",
      },
      {
        id: "employee-commuting",
        title: "Employee Commuting",
        icon: "🚇",
        emissions: "18.3 tCO₂e",
        dataQuality: "Low",
        coverage: 35,
        colorClass: "employee-commuting",
        headerBg: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
        route: "/data-collection/scope-3/employee-commuting",
      },
      {
        id: "purchased-goods",
        title: "Purchased Goods & Services",
        icon: "📦",
        emissions: "8.9 tCO₂e",
        dataQuality: "Low",
        coverage: 15,
        colorClass: "purchased-goods",
        headerBg: "linear-gradient(135deg, #f59e0b, #d97706)",
        route: "/data-collection/scope-3/purchased-goods",
      },
      {
        id: "waste",
        title: "Waste Generated in Operations",
        icon: "🗑️",
        emissions: "5.6 tCO₂e",
        dataQuality: "Medium",
        coverage: 55,
        colorClass: "waste",
        headerBg: "linear-gradient(135deg, #ef4444, #dc2626)",
        route: "/data-collection/scope-3/waste",
      },
    ],
  },
];

const DataCollectionOverview = () => {
  const [expandedScope, setExpandedScope] = useState<string | null>(null);
  const router = useRouter();

  const toggleScope = (scopeId: string) => {
    setExpandedScope(expandedScope === scopeId ? null : scopeId);
  };

  const handleCategoryClick = (route: string) => {
    router.push(route);
  };

  return (
    <div css={containerStyle}>
      <DataCollectionHeader />

      {scopesData.map((scope) => (
        <ScopeSection
          key={scope.id}
          scope={scope}
          isExpanded={expandedScope === scope.id}
          onToggle={() => toggleScope(scope.id)}
          onCategoryClick={handleCategoryClick}
        />
      ))}

      <ValidationSummary />
      <ActionButtons />
    </div>
  );
};

export default DataCollectionOverview;

