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
import { EmissionsBreakdown } from "@/service/dashboard/types"

interface EmissionsChartProps {
  emissionsData?: EmissionsBreakdown;
}

const EmissionsChart = ({ emissionsData }: EmissionsChartProps) => {
  const legendData = [
    {
      color: "#ef4444",
      label: "Scope 1 - Direct Emissions",
      value: `${Math.round(emissionsData?.scope1Percentage || 0)}%`
    },
    {
      color: "#f59e0b",
      label: "Scope 2 - Electricity",
      value: `${Math.round(emissionsData?.scope2Percentage || 0)}%`
    },
    {
      color: "#8b5cf6",
      label: "Scope 3 - Indirect",
      value: `${Math.round(emissionsData?.scope3Percentage || 0)}%`
    },
  ];

  const currentQuarter = `Q${Math.floor((new Date().getMonth() + 3) / 3)} ${new Date().getFullYear()}`;
  const totalEmissions = emissionsData?.totalEmissions || "0";

  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle>Emissions by Scope</ChartTitle>
        <ChartSelect>
          <option>{currentQuarter}</option>
        </ChartSelect>
      </ChartHeader>
      <ScopeBreakdownChart>
        <PieChart>
          <PieCenter>
            <PieTotal>{totalEmissions}</PieTotal>
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
          <SummaryValue>{totalEmissions} tCO₂e</SummaryValue>
          <SummaryChange>vs previous quarter</SummaryChange>
        </TotalSummary>
      </ScopeBreakdownChart>
    </ChartCard>
  )
}

export default EmissionsChart
