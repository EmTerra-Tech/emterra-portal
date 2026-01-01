"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  avatarUrl?: string;
  roles: string[];
  assignedBranchIds: number[];
  isActive: boolean;
  lastLoginAt?: string;
  company: {
    name: string;
    industry: string;
    logoUrl?: string;
  };
}

interface Branch {
  id: number;
  name: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  branches: Branch[];
  selectedBranchId: number | null;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setBranches: (branches: Branch[]) => void;
  setSelectedBranchId: (branchId: number | null) => void;
  logout: () => void;

  // Permission helpers
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  isCompanyLevel: () => boolean;
  isGlobalAdmin: () => boolean;
  canEdit: () => boolean;
  canManageUsers: () => boolean;
  canManageConfiguration: () => boolean;
  canAccessBranch: (branchId: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Auto-select first branch when branches load
  useEffect(() => {
    if (branches.length > 0 && selectedBranchId === null) {
      // For company-level users, default to null (all branches)
      // For branch-level users, default to their first assigned branch
      if (user && isCompanyLevel()) {
        setSelectedBranchId(null); // "All Branches"
      } else if (user && user.assignedBranchIds.length > 0) {
        const firstBranch = branches.find(b => user.assignedBranchIds.includes(b.id));
        if (firstBranch) {
          setSelectedBranchId(firstBranch.id);
        }
      }
    }
  }, [branches, user]);

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Fetch user profile
      const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUser(profileData.data);
      }

      // Fetch branches
      const branchesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (branchesRes.ok) {
        const branchesData = await branchesRes.json();
        setBranches(branchesData.data || []);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setBranches([]);
    setSelectedBranchId(null);
    window.location.href = '/';
  };

  // Permission helpers
  const hasRole = (role: string): boolean => {
    if (!user) return false;
    return user.roles.includes(role);
  };

  const hasAnyRole = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.some(role => user.roles.includes(role));
  };

  const isCompanyLevel = (): boolean => {
    if (!user) return false;
    return hasAnyRole(['ROLE_GLOBAL_ADMIN', 'ROLE_COMPANY_ADMIN', 'ROLE_COMPANY_VIEWER']);
  };

  const isGlobalAdmin = (): boolean => {
    if (!user) return false;
    return hasRole('ROLE_GLOBAL_ADMIN');
  };

  const canEdit = (): boolean => {
    if (!user) return false;
    return hasAnyRole(['ROLE_GLOBAL_ADMIN', 'ROLE_COMPANY_ADMIN', 'ROLE_BRANCH_ADMIN', 'ROLE_BRANCH_EDITOR']);
  };

  const canManageUsers = (): boolean => {
    if (!user) return false;
    return hasAnyRole(['ROLE_GLOBAL_ADMIN', 'ROLE_COMPANY_ADMIN', 'ROLE_BRANCH_ADMIN']);
  };

  const canManageConfiguration = (): boolean => {
    if (!user) return false;
    return hasAnyRole(['ROLE_GLOBAL_ADMIN', 'ROLE_COMPANY_ADMIN']);
  };

  const canAccessBranch = (branchId: number): boolean => {
    if (!user) return false;
    // Company-level users can access all branches
    if (isCompanyLevel()) return true;
    // Branch-level users can only access assigned branches
    return user.assignedBranchIds.includes(branchId);
  };

  const value: AuthContextType = {
    user,
    branches,
    selectedBranchId,
    isLoading,
    setUser,
    setBranches,
    setSelectedBranchId,
    logout,
    hasRole,
    hasAnyRole,
    isCompanyLevel,
    isGlobalAdmin,
    canEdit,
    canManageUsers,
    canManageConfiguration,
    canAccessBranch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
