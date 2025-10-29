import {
  StatCard,
  StatChange,
  StatLabel,
  StatsContainer,
  StatValue,
} from "./styles";

const statsData = [
  {
    value: "15,234",
    label: "Total CO₂e (tonnes)",
    change: "↗ +2.3% vs last quarter",
    variant: "negative" as const,
  },
  {
    value: "87%",
    label: "Data Quality Score",
    change: "↗ +5% vs last quarter",
    variant: "positive" as const,
  },
  {
    value: "92%",
    label: "Data Coverage Score",
    change: "↗ +3% vs last quarter",
    variant: "positive" as const,
  },
  {
    value: "6.2",
    label: "Intensity (tCO₂e/employee)",
    change: "↘ -5.8% vs last quarter",
    variant: "positive" as const,
  },
];

const StatsGrid = () => {
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

