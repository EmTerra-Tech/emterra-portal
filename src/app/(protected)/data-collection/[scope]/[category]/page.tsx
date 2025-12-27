"use client"

import DashboardLayout from "../../../../../components/dashboard-layout"
import DataInputForm from "../../../../../components/data-input-form"

// Map route segments to scope types
const scopeMap: Record<string, Record<string, string>> = {
  "scope-1": {
    "stationary-combustion": "SCOPE1_STATIONARY_COMBUSTION",
    "mobile-combustion": "SCOPE1_MOBILE_COMBUSTION",
    "refrigerants": "SCOPE1_FUGITIVE_EMISSIONS",
    "process-emissions": "SCOPE1_PROCESS_EMISSIONS",
  },
  "scope-2": {
    "purchased-electricity-facilities": "SCOPE2_PURCHASED_ELECTRICITY",
    "purchased-electricity-vehicles": "SCOPE2_PURCHASED_ELECTRICITY",
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
}

interface PageProps {
  params: {
    scope: string
    category: string
  }
}

export default function DataCollectionDetailPage({ params }: PageProps) {
  const { scope: scopeSlug, category: categorySlug } = params

  // Get the scope type from the mapping
  const scopeType = scopeMap[scopeSlug]?.[categorySlug]

  // If no mapping found, use a default or show error
  if (!scopeType) {
    return (
      <DashboardLayout>
        <div style={{ padding: "2rem" }}>
          <h2>Invalid Route</h2>
          <p>The requested scope and category combination is not valid.</p>
          <p>Scope: {scopeSlug}, Category: {categorySlug}</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <DataInputForm scope={scopeType} />
    </DashboardLayout>
  )
}
