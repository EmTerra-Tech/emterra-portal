"use client";

import DashboardLayout from "@components/dashboard-layout";
import EmissionsChart from "@components/emissions-chart";
import StatsGrid from "@components/stats-grid";
import { DashboardContent, WelcomeSection } from "./styles";

export default function EmTerraOverview() {
  return (
    <DashboardLayout>
      <div className={DashboardContent}>
        <div className={WelcomeSection}>
          <h1>Good morning, John! 👋</h1>
          <p>Here's your carbon footprint overview for Q4 2024</p>
        </div>

        <StatsGrid />
        <EmissionsChart />
      </div>
    </DashboardLayout>
  );
}

