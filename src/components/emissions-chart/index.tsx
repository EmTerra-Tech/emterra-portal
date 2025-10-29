"use client"

import {
  ChartCard,
  ChartHeader,
  ChartTitle,
  ChartSelect,
  ScopeBreakdownChart,
  PieChart,
  PieCenter,
  PieTotal,
  PieLabel,
  ScopeLegend,
  LegendItem,
  LegendColor,
  LegendLabel,
  LegendValue,
  TotalSummary,
  SummaryLabel,
  SummaryValue,
  SummaryChange,
} from "./styles"

const legendData = [
  { color: "#ef4444", label: "Scope 1 - Direct Emissions", value: "45%" },
  { color: "#f59e0b", label: "Scope 2 - Electricity", value: "35%" },
  { color: "#8b5cf6", label: "Scope 3 - Indirect", value: "20%" },
]

const EmissionsChart = () => {
  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle>Emissions by Scope</ChartTitle>
        <ChartSelect>
          <option>Q4 2024</option>
          <option>Q3 2024</option>
          <option>Q2 2024</option>
        </ChartSelect>
      </ChartHeader>
      <ScopeBreakdownChart>
        <PieChart>
          <PieCenter>
            <PieTotal>15,234</PieTotal>
            <PieLabel>tCO₂e</PieLabel>
          </PieCenter>
        </PieChart>
        <ScopeLegend>
          {legendData.map((item, index) => (
            <LegendItem key={index}>
              <LegendColor color={item.color} />
              <LegendLabel>{item.label}</LegendLabel>
              <LegendValue>{item.value}</LegendValue>
            </LegendItem>
          ))}
        </ScopeLegend>
        <TotalSummary>
          <SummaryLabel>Total Quarterly Emissions</SummaryLabel>
          <SummaryValue>15,234 tCO₂e</SummaryValue>
          <SummaryChange>+2.3% vs Q3 2024</SummaryChange>
        </TotalSummary>
      </ScopeBreakdownChart>
    </ChartCard>
  )
}

export default EmissionsChart
