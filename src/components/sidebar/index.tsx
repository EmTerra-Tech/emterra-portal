"use client";

import emterra_logo from "@public/emterra_icon.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  NavIcon,
  NavItem,
  NavSection,
  NavTitle,
  SidebarContainer,
  SidebarLogo,
  logo,
} from "./styles";

const navItems = [
  { href: "/dashboard", icon: "📊", label: "Dashboard", section: "Main" },
  {
    href: "/company-profile",
    icon: "🏢",
    label: "Company Profile",
    section: "Main",
  },
  {
    href: "/data-collection",
    icon: "📥",
    label: "Data Collection",
    section: "Main",
  },
  { href: "/reports", icon: "📋", label: "Reports", section: "Main" },
  {
    href: "/configuration",
    icon: "⚙️",
    label: "Configuration",
    section: "Settings",
  },
  { href: "/users", icon: "👥", label: "Users", section: "Settings" },
];

const Sidebar = () => {
  const pathname = usePathname();

  const router = useRouter();

  const groupedItems = navItems.reduce(
    (acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }
      acc[item.section].push(item);
      return acc;
    },
    {} as Record<string, typeof navItems>,
  );

  const routingHandler = (item: {
    href: string;
    icon: string;
    label: string;
    section: string;
  }) => {
    router.push(item.href);
  };

  return (
    <div className={SidebarContainer}>
      <div className={SidebarLogo}>
        <Image className={logo} alt="Logo" src={emterra_logo} />
      </div>

      {Object.entries(groupedItems).map(([section, items]) => (
        <div key={section} className={NavSection}>
          <div className={NavTitle}>{section}</div>
          {items.map((item) => (
            <div
              className={NavItem(pathname === item.href)}
              key={item.href}
              onClick={() => routingHandler(item)}
            >
              <div className={NavIcon}>{item.icon}</div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

