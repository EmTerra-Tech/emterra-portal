"use client";

import DashboardLayout from "../../../components/dashboard-layout";
import { useState } from "react";

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
            ⚙️ Configuration
          </h1>
          <p style={{ fontSize: "16px", color: "#64748b" }}>
            Manage your organization settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          borderBottom: "2px solid #e2e8f0",
          marginBottom: "32px",
        }}>
          <Tab label="General" value="general" active={activeTab === "general"} onClick={() => setActiveTab("general")} />
          <Tab label="Emission Factors" value="factors" active={activeTab === "factors"} onClick={() => setActiveTab("factors")} />
          <Tab label="Data Sources" value="sources" active={activeTab === "sources"} onClick={() => setActiveTab("sources")} />
          <Tab label="Notifications" value="notifications" active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <SettingCard
              title="Organization Information"
              description="Basic information about your organization"
            >
              <SettingField label="Organization Name" value="EmTerra Tech" />
              <SettingField label="Industry" value="Technology" />
              <SettingField label="Headquarters" value="San Francisco, CA" />
              <SettingField label="Fiscal Year Start" value="January 1" />
            </SettingCard>

            <SettingCard
              title="Reporting Standards"
              description="Configure your emission reporting standards"
            >
              <SettingField label="Primary Standard" value="GHG Protocol" />
              <SettingField label="Secondary Standards" value="ISO 14064-1, CDP" />
              <SettingField label="Operational Boundary" value="Operational Control" />
            </SettingCard>

            <SettingCard
              title="Regional Settings"
              description="Configure regional and localization settings"
            >
              <SettingField label="Time Zone" value="Pacific Time (PT)" />
              <SettingField label="Date Format" value="MM/DD/YYYY" />
              <SettingField label="Currency" value="USD ($)" />
              <SettingField label="Units System" value="Metric" />
            </SettingCard>
          </div>
        )}

        {/* Emission Factors */}
        {activeTab === "factors" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <SettingCard
              title="Default Emission Factors"
              description="Configure default emission factors for calculations"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <EmissionFactorRow source="EPA 2024" region="United States" status="Active" lastUpdated="Dec 2024" />
                <EmissionFactorRow source="DEFRA 2024" region="United Kingdom" status="Active" lastUpdated="Nov 2024" />
                <EmissionFactorRow source="IEA 2023" region="Global" status="Active" lastUpdated="Oct 2024" />
                <EmissionFactorRow source="Custom Factors" region="Organization" status="Active" lastUpdated="Dec 2024" />
              </div>
            </SettingCard>

            <SettingCard
              title="Calculation Methods"
              description="Configure calculation methodologies"
            >
              <SettingField label="Scope 1 Method" value="Activity-based" />
              <SettingField label="Scope 2 Method" value="Location-based & Market-based" />
              <SettingField label="Scope 3 Method" value="Hybrid (Activity & Spend-based)" />
            </SettingCard>
          </div>
        )}

        {/* Data Sources */}
        {activeTab === "sources" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <SettingCard
              title="Connected Data Sources"
              description="Manage integrations with external data sources"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <DataSourceRow name="Utility Bill Data" type="Manual Upload" status="Connected" />
                <DataSourceRow name="Fleet Management System" type="API Integration" status="Pending" />
                <DataSourceRow name="Procurement System" type="API Integration" status="Connected" />
                <DataSourceRow name="Travel & Expense System" type="API Integration" status="Not Connected" />
              </div>
            </SettingCard>

            <button style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              background: "linear-gradient(135deg, #2dd4bf, #059669)",
              color: "white",
              width: "fit-content",
            }}>
              + Add New Data Source
            </button>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <SettingCard
              title="Email Notifications"
              description="Configure email notification preferences"
            >
              <NotificationToggle label="Data Submission Reminders" enabled={true} />
              <NotificationToggle label="Report Generation Complete" enabled={true} />
              <NotificationToggle label="Data Quality Alerts" enabled={true} />
              <NotificationToggle label="Weekly Summary" enabled={false} />
              <NotificationToggle label="Monthly Report" enabled={true} />
            </SettingCard>

            <SettingCard
              title="Alert Thresholds"
              description="Configure automatic alerts for data quality issues"
            >
              <SettingField label="Missing Data Threshold" value="10% of total" />
              <SettingField label="Data Age Alert" value="90 days" />
              <SettingField label="Anomaly Detection" value="Enabled" />
            </SettingCard>
          </div>
        )}

        {/* Save Button */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid #e2e8f0",
        }}>
          <button style={{
            padding: "12px 32px",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            background: "linear-gradient(135deg, #2dd4bf, #059669)",
            color: "white",
          }}>
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Tab({ label, value, active, onClick }: { label: string; value: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 24px",
        border: "none",
        borderBottom: active ? "3px solid #2dd4bf" : "3px solid transparent",
        background: "transparent",
        color: active ? "#2dd4bf" : "#64748b",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );
}

function SettingCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "24px",
    }}>
      <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
        {description}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {children}
      </div>
    </div>
  );
}

function SettingField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>{label}</span>
      <span style={{ fontSize: "14px", color: "#64748b" }}>{value}</span>
    </div>
  );
}

function EmissionFactorRow({ source, region, status, lastUpdated }: { source: string; region: string; status: string; lastUpdated: string }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
    }}>
      <div>
        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "4px" }}>{source}</div>
        <div style={{ fontSize: "12px", color: "#64748b" }}>{region}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "12px", color: "#64748b" }}>Updated: {lastUpdated}</span>
        <span style={{
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          background: "#dcfce7",
          color: "#166534",
        }}>
          {status}
        </span>
      </div>
    </div>
  );
}

function DataSourceRow({ name, type, status }: { name: string; type: string; status: string }) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    "Connected": { bg: "#dcfce7", text: "#166534" },
    "Pending": { bg: "#fef3c7", text: "#92400e" },
    "Not Connected": { bg: "#fee2e2", text: "#991b1b" },
  };

  const colors = statusColors[status] || statusColors["Not Connected"];

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
    }}>
      <div>
        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "4px" }}>{name}</div>
        <div style={{ fontSize: "12px", color: "#64748b" }}>{type}</div>
      </div>
      <span style={{
        padding: "4px 12px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "600",
        background: colors.bg,
        color: colors.text,
      }}>
        {status}
      </span>
    </div>
  );
}

function NotificationToggle({ label, enabled }: { label: string; enabled: boolean }) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>{label}</span>
      <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={() => setIsEnabled(!isEnabled)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={{
          position: "absolute",
          cursor: "pointer",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isEnabled ? "#2dd4bf" : "#cbd5e1",
          transition: "0.3s",
          borderRadius: "24px",
        }}>
          <span style={{
            position: "absolute",
            content: '""',
            height: "16px",
            width: "16px",
            left: isEnabled ? "24px" : "4px",
            bottom: "4px",
            background: "white",
            transition: "0.3s",
            borderRadius: "50%",
          }} />
        </span>
      </label>
    </div>
  );
}
