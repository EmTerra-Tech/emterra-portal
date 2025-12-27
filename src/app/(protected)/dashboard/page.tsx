"use client";

import DashboardLayout from "@components/dashboard-layout";
import EmissionsChart from "@components/emissions-chart";
import StatsGrid from "@components/stats-grid";
import DashboardActions from "@/service/dashboard/actions";
import { useEffect, useState } from "react";
import { DashboardStats } from "@/service/dashboard/types";
import { DashboardContent, WelcomeSection } from "./styles";

export default function EmTerraOverview() {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await DashboardActions.getDashboardStats();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const userName = dashboardData?.userInfo.firstName || "there";
  const currentQuarter = `Q${Math.floor((new Date().getMonth() + 3) / 3)} ${new Date().getFullYear()}`;

  if (loading) {
    return (
      <DashboardLayout>
        <div className={DashboardContent}>
          <div className={WelcomeSection}>
            <h1>Loading...</h1>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={DashboardContent}>
        <div className={WelcomeSection}>
          <h1>{getGreeting()}, {userName}! 👋</h1>
          <p>Here's your carbon footprint overview for {currentQuarter}</p>
        </div>

        <StatsGrid stats={dashboardData?.stats} />
        <EmissionsChart emissionsData={dashboardData?.emissionsBreakdown} />
      </div>
    </DashboardLayout>
  );
}

