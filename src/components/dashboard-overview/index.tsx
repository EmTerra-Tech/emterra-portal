/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import EmissionsChart from "../emissions-chart";
import StatsGrid from "../stats-grid";

const DashboardContent = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WelcomeSection = css`
  background: #f7f9fc;
  padding: 2rem;
  border-radius: 8px;
`;

const DashboardOverview = () => {
  return (
    <div css={DashboardContent}>
      <div css={WelcomeSection}>
        <h1>Good morning, John! 👋</h1>
        <p>Here's your carbon footprint overview for Q4 2024</p>
      </div>
      <StatsGrid />
      <EmissionsChart />
    </div>
  );
};

export default DashboardOverview;

