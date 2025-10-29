import Sidebar from "@components/sidebar";
import TopBar from "@components/top-bar";
import type { ReactNode } from "react";

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

