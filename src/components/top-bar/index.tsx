/** @jsxImportSource @emotion/react */
"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, TopBarContainer, UserAvatar, UserMenu } from "./styles";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard / Overview",
  "/company-profile": "Company Profile / Overview",
  "/company-profile/add-facility": "Company Profile / Add Facility",
  "/data-collection": "Data Collection / Overview",
  "/data-collection/scope-1/stationary-combustion":
    "Data Collection / Scope 1 / Stationary Combustion",
};

const TopBar = () => {
  const pathname = usePathname();
  const breadcrumb = breadcrumbMap[pathname] || "Dashboard";

  return (
    <div className={TopBarContainer}>
      <div className={Breadcrumb}>{breadcrumb}</div>
      <div className={UserMenu}>
        {/* <div className={NotificationIcon}>🔔</div> */}
        <div className={UserAvatar}>JD</div>
      </div>
    </div>
  );
};

export default TopBar;

