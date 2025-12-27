import {
  StatCard,
  StatChange,
  StatLabel,
  StatsContainer,
  StatValue,
} from "./styles";
import { StatsData } from "@/service/dashboard/types";

interface StatsGridProps {
  stats?: StatsData;
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  const statsData = [
    {
      value: stats?.totalEmissions || "0",
      label: "Total CO₂e (tonnes)",
      change: "vs last quarter",
      variant: "neutral" as const,
    },
    {
      value: stats?.dataQualityScore || "0%",
      label: "Data Quality Score",
      change: "vs last quarter",
      variant: "positive" as const,
    },
    {
      value: stats?.dataCoverageScore || "0%",
      label: "Data Coverage Score",
      change: "vs last quarter",
      variant: "positive" as const,
    },
    {
      value: stats?.intensityPerEmployee || "0",
      label: "Intensity (tCO₂e/employee)",
      change: "vs last quarter",
      variant: "neutral" as const,
    },
  ];

  return (
    <div className={StatsContainer}>
      {statsData.map((stat, index) => (
        <div className={StatCard} key={index}>
          <div className={StatValue}>{stat.value}</div>
          <div className={StatLabel}>{stat.label}</div>
          <div className={StatChange(stat.variant)}>{stat.change}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;

