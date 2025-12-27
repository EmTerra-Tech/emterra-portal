"use client";

import DashboardLayout from "../../../components/dashboard-layout";
import { useState } from "react";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
              👥 Users
            </h1>
            <p style={{ fontSize: "16px", color: "#64748b" }}>
              Manage user accounts and permissions
            </p>
          </div>
          <button style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            background: "linear-gradient(135deg, #2dd4bf, #059669)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span>+</span> Invite User
          </button>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "24px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
          <select style={{
            padding: "10px 16px",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
          }}>
            <option>All Roles</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>Viewer</option>
          </select>
          <select style={{
            padding: "10px 16px",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
          }}>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <StatCard label="Total Users" value="24" trend="+2 this month" />
          <StatCard label="Active Users" value="22" trend="91.7%" />
          <StatCard label="Pending Invites" value="3" trend="Awaiting response" />
          <StatCard label="Admins" value="4" trend="16.7% of total" />
        </div>

        {/* Users Table */}
        <div style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>User</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Role</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Department</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Last Active</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <UserRow
                name="Sarah Johnson"
                email="sarah.johnson@emterra.com"
                role="Admin"
                department="Operations"
                lastActive="2 hours ago"
                status="Active"
              />
              <UserRow
                name="Michael Chen"
                email="michael.chen@emterra.com"
                role="Manager"
                department="Sustainability"
                lastActive="5 hours ago"
                status="Active"
              />
              <UserRow
                name="Emily Davis"
                email="emily.davis@emterra.com"
                role="Manager"
                department="Finance"
                lastActive="1 day ago"
                status="Active"
              />
              <UserRow
                name="James Wilson"
                email="james.wilson@emterra.com"
                role="Viewer"
                department="Procurement"
                lastActive="3 days ago"
                status="Active"
              />
              <UserRow
                name="Lisa Anderson"
                email="lisa.anderson@emterra.com"
                role="Admin"
                department="IT"
                lastActive="1 hour ago"
                status="Active"
              />
              <UserRow
                name="Robert Taylor"
                email="robert.taylor@emterra.com"
                role="Viewer"
                department="Operations"
                lastActive="2 weeks ago"
                status="Inactive"
              />
              <UserRow
                name="Jennifer Martinez"
                email="jennifer.martinez@emterra.com"
                role="Manager"
                department="Sustainability"
                lastActive="Never"
                status="Pending"
              />
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}>
          <span style={{ fontSize: "14px", color: "#64748b" }}>
            Showing 1-7 of 24 users
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <PageButton label="Previous" disabled />
            <PageButton label="1" active />
            <PageButton label="2" />
            <PageButton label="3" />
            <PageButton label="Next" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "20px",
    }}>
      <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px" }}>{label}</div>
      <div style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "4px" }}>{value}</div>
      <div style={{ fontSize: "12px", color: "#10b981" }}>{trend}</div>
    </div>
  );
}

interface UserRowProps {
  name: string;
  email: string;
  role: string;
  department: string;
  lastActive: string;
  status: string;
}

function UserRow({ name, email, role, department, lastActive, status }: UserRowProps) {
  const roleColors: Record<string, { bg: string; text: string }> = {
    "Admin": { bg: "#fef3c7", text: "#92400e" },
    "Manager": { bg: "#dbeafe", text: "#1e40af" },
    "Viewer": { bg: "#f3e8ff", text: "#6b21a8" },
  };

  const statusColors: Record<string, { bg: string; text: string }> = {
    "Active": { bg: "#dcfce7", text: "#166534" },
    "Inactive": { bg: "#fee2e2", text: "#991b1b" },
    "Pending": { bg: "#fef3c7", text: "#92400e" },
  };

  const roleColor = roleColors[role] || roleColors["Viewer"];
  const statusColor = statusColors[status] || statusColors["Active"];

  return (
    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
      <td style={{ padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2dd4bf, #059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
          }}>
            {name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>{name}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>{email}</div>
          </div>
        </div>
      </td>
      <td style={{ padding: "16px" }}>
        <span style={{
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          background: roleColor.bg,
          color: roleColor.text,
        }}>
          {role}
        </span>
      </td>
      <td style={{ padding: "16px", fontSize: "14px", color: "#64748b" }}>{department}</td>
      <td style={{ padding: "16px", fontSize: "14px", color: "#64748b" }}>{lastActive}</td>
      <td style={{ padding: "16px" }}>
        <span style={{
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          background: statusColor.bg,
          color: statusColor.text,
        }}>
          {status}
        </span>
      </td>
      <td style={{ padding: "16px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={{
            padding: "6px 12px",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            background: "white",
            color: "#374151",
          }}>
            Edit
          </button>
          <button style={{
            padding: "6px 12px",
            border: "1px solid #fee2e2",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            background: "white",
            color: "#ef4444",
          }}>
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
}

function PageButton({ label, active, disabled }: { label: string; active?: boolean; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      style={{
        padding: "8px 16px",
        border: "1px solid #e5e7eb",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: disabled ? "not-allowed" : "pointer",
        background: active ? "linear-gradient(135deg, #2dd4bf, #059669)" : "white",
        color: active ? "white" : disabled ? "#cbd5e1" : "#374151",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label}
    </button>
  );
}
