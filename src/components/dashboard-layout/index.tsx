/** @jsxImportSource @emotion/react */
import type { ReactNode } from "react";
import Sidebar from "../sidebar";
import TopBar from "../top-bar";

import { LayoutContainer, MainContent } from "./styles";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={LayoutContainer}>
      <Sidebar />
      <div className={MainContent}>
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

