"use client";

import DashboardLayout from "../../../components/dashboard-layout";
import { useState } from "react";

export default function ReportsPage() {
  const [selectedYear, setSelectedYear] = useState("2025");

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
            📊 Reports & Analytics
          </h1>
          <p style={{ fontSize: "16px", color: "#64748b" }}>
            View and download emission reports for your organization
          </p>
        </div>

        {/* Year Selector */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginRight: "12px" }}>
              Reporting Year:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                padding: "8px 16px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#1e293b",
                cursor: "pointer",
              }}
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        {/* Report Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "32px" }}>
          {/* Emissions Summary Report */}
          <ReportCard
            icon="📈"
            title="Emissions Summary Report"
            description="Comprehensive overview of all emissions across scopes"
            status="Available"
            statusColor="#10b981"
          />

          {/* Scope 1 Report */}
          <ReportCard
            icon="🔥"
            title="Scope 1 Report"
            description="Direct emissions from owned or controlled sources"
            status="Available"
            statusColor="#10b981"
          />

          {/* Scope 2 Report */}
          <ReportCard
            icon="⚡"
            title="Scope 2 Report"
            description="Indirect emissions from purchased electricity"
            status="Available"
            statusColor="#10b981"
          />

          {/* Scope 3 Report */}
          <ReportCard
            icon="🌐"
            title="Scope 3 Report"
            description="Other indirect emissions in the value chain"
            status="In Progress"
            statusColor="#f59e0b"
          />

          {/* Data Quality Report */}
          <ReportCard
            icon="✅"
            title="Data Quality Report"
            description="Assessment of data completeness and accuracy"
            status="Available"
            statusColor="#10b981"
          />

          {/* Compliance Report */}
          <ReportCard
            icon="📋"
            title="Compliance Report"
            description="GHG Protocol and regulatory compliance report"
            status="Available"
            statusColor="#10b981"
          />
        </div>

        {/* Export Options */}
        <div style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "16px" }}>
            Export Options
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <ExportButton icon="📄" label="Export as PDF" />
            <ExportButton icon="📊" label="Export as Excel" />
            <ExportButton icon="📈" label="Export as CSV" />
            <ExportButton icon="📑" label="Generate Verification Report" primary />
          </div>
        </div>

        {/* Recent Reports */}
        <div style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "24px",
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "16px" }}>
            Recent Reports
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <RecentReportItem
              name="Emissions Summary Report - 2024"
              date="Dec 15, 2024"
              size="2.4 MB"
            />
            <RecentReportItem
              name="Scope 1 Report - Q4 2024"
              date="Dec 10, 2024"
              size="1.8 MB"
            />
            <RecentReportItem
              name="Compliance Report - 2024"
              date="Dec 5, 2024"
              size="3.2 MB"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

interface ReportCardProps {
  icon: string;
  title: string;
  description: string;
  status: string;
  statusColor: string;
}

function ReportCard({ icon, title, description, status, statusColor }: ReportCardProps) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "20px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "translateY(0)";
    }}>
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>{icon}</div>
      <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
        {title}
      </h4>
      <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "12px" }}>
        {description}
      </p>
      <div style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "600",
        color: "white",
        background: statusColor,
      }}>
        {status}
      </div>
    </div>
  );
}

interface ExportButtonProps {
  icon: string;
  label: string;
  primary?: boolean;
}

function ExportButton({ icon, label, primary }: ExportButtonProps) {
  return (
    <button style={{
      padding: "10px 20px",
      border: primary ? "none" : "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      background: primary ? "linear-gradient(135deg, #2dd4bf, #059669)" : "white",
      color: primary ? "white" : "#374151",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }}
    onMouseEnter={(e) => {
      if (!primary) {
        e.currentTarget.style.background = "#f8fafc";
      } else {
        e.currentTarget.style.transform = "translateY(-2px)";
      }
    }}
    onMouseLeave={(e) => {
      if (!primary) {
        e.currentTarget.style.background = "white";
      } else {
        e.currentTarget.style.transform = "translateY(0)";
      }
    }}>
      <span>{icon}</span>
      {label}
    </button>
  );
}

interface RecentReportItemProps {
  name: string;
  date: string;
  size: string;
}

function RecentReportItem({ name, date, size }: RecentReportItemProps) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#f8fafc";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "white";
    }}>
      <div>
        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "4px" }}>
          {name}
        </div>
        <div style={{ fontSize: "12px", color: "#64748b" }}>
          {date} • {size}
        </div>
      </div>
      <button style={{
        padding: "6px 16px",
        border: "none",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        background: "linear-gradient(135deg, #2dd4bf, #059669)",
        color: "white",
      }}>
        Download
      </button>
    </div>
  );
}
