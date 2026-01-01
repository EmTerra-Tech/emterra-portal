/** @jsxImportSource @emotion/react */
"use client";

import { usePathname, useRouter } from "next/navigation";
import { Select, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from '@/context/AuthContext';
import { Breadcrumb, TopBarContainer, UserMenu } from "./styles";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard / Overview",
  "/company-profile": "Company Profile / Overview",
  "/company-profile/add-facility": "Company Profile / Add Facility",
  "/data-collection": "Data Collection / Overview",
  "/data-collection/scope-1/stationary-combustion":
    "Data Collection / Scope 1 / Stationary Combustion",
  "/users": "Users / Management",
  "/reports": "Reports / Overview",
  "/configuration": "Configuration / Settings",
  "/settings": "Settings / Profile",
};

const TopBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const breadcrumb = breadcrumbMap[pathname] || "Dashboard";

  const { user, branches, selectedBranchId, setSelectedBranchId, isCompanyLevel, logout } = useAuth();

  // Filter branches based on user access
  const accessibleBranches = branches.filter(branch => {
    if (!user) return false;
    // Company-level users see all branches
    if (isCompanyLevel()) return true;
    // Branch-level users only see assigned branches
    return user.assignedBranchIds.includes(branch.id);
  });

  // Branch selector options
  const branchOptions = [
    ...(isCompanyLevel() ? [{ label: 'All Branches', value: null }] : []),
    ...accessibleBranches.map(branch => ({
      label: branch.name,
      value: branch.id,
    })),
  ];

  // User dropdown menu
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: (
        <div>
          <div style={{ fontWeight: 600 }}>{user?.firstName} {user?.lastName}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{user?.email}</div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
      danger: true,
    },
  ];

  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <div className={TopBarContainer}>
      <div className={Breadcrumb}>{breadcrumb}</div>
      <div className={UserMenu}>
        {/* Branch Selector */}
        {branchOptions.length > 0 && (
          <Select
            value={selectedBranchId}
            onChange={setSelectedBranchId}
            options={branchOptions}
            style={{ width: 200, marginRight: '16px' }}
            placeholder="Select Branch"
          />
        )}

        {/* User Avatar Dropdown */}
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
          <Space style={{ cursor: 'pointer' }}>
            <Avatar
              src={user?.avatarUrl}
              style={{ backgroundColor: '#1890ff' }}
            >
              {!user?.avatarUrl && getUserInitials()}
            </Avatar>
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopBar;

