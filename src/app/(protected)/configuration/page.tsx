"use client";

import { useEffect, useState } from "react";
import { Input, message, Select, Switch } from "antd";
import DashboardLayout from "../../../components/dashboard-layout";
import ConfigurationsActions from "@/service/configurations/actions";

type TabKey = "general" | "factors" | "sources" | "notifications";

interface GeneralSettings {
  organizationName: string;
  industry: string;
  headquarters: string;
  fiscalYearStart: string;
  primaryStandard: string;
  secondaryStandards: string;
  operationalBoundary: string;
  timeZone: string;
  dateFormat: string;
  currency: string;
  unitsSystem: string;
}

interface EmissionFactor {
  source: string;
  region: string;
  status: string;
  lastUpdated: string;
}

interface FactorsSettings {
  defaultFactors: EmissionFactor[];
  scope1Method: string;
  scope2Method: string;
  scope3Method: string;
}

interface DataSource {
  name: string;
  type: string;
  status: "Connected" | "Pending" | "Not Connected";
}

interface SourcesSettings {
  dataSources: DataSource[];
}

interface NotificationsSettings {
  emailNotifications: Record<string, boolean>;
  missingDataThreshold: string;
  dataAgeAlert: string;
  anomalyDetection: boolean;
}

const DEFAULT_GENERAL: GeneralSettings = {
  organizationName: "",
  industry: "",
  headquarters: "",
  fiscalYearStart: "January 1",
  primaryStandard: "GHG Protocol",
  secondaryStandards: "",
  operationalBoundary: "Operational Control",
  timeZone: "UTC",
  dateFormat: "MM/DD/YYYY",
  currency: "USD",
  unitsSystem: "Metric",
};

const DEFAULT_FACTORS: FactorsSettings = {
  defaultFactors: [
    { source: "EPA 2024", region: "United States", status: "Active", lastUpdated: "" },
    { source: "DEFRA 2024", region: "United Kingdom", status: "Active", lastUpdated: "" },
    { source: "IEA 2023", region: "Global", status: "Active", lastUpdated: "" },
  ],
  scope1Method: "Activity-based",
  scope2Method: "Location-based & Market-based",
  scope3Method: "Hybrid (Activity & Spend-based)",
};

const DEFAULT_SOURCES: SourcesSettings = {
  dataSources: [
    { name: "Utility Bill Data", type: "Manual Upload", status: "Connected" },
    { name: "Fleet Management System", type: "API Integration", status: "Pending" },
  ],
};

const DEFAULT_NOTIFICATIONS: NotificationsSettings = {
  emailNotifications: {
    "Data Submission Reminders": true,
    "Report Generation Complete": true,
    "Data Quality Alerts": true,
    "Weekly Summary": false,
    "Monthly Report": true,
  },
  missingDataThreshold: "10% of total",
  dataAgeAlert: "90 days",
  anomalyDetection: true,
};

const TAB_TO_KEY: Record<TabKey, string> = {
  general: "settings.general",
  factors: "settings.emission_factors",
  sources: "settings.data_sources",
  notifications: "settings.notifications",
};

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [general, setGeneral] = useState<GeneralSettings>(DEFAULT_GENERAL);
  const [factors, setFactors] = useState<FactorsSettings>(DEFAULT_FACTORS);
  const [sources, setSources] = useState<SourcesSettings>(DEFAULT_SOURCES);
  const [notifications, setNotifications] = useState<NotificationsSettings>(DEFAULT_NOTIFICATIONS);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [g, f, s, n] = await Promise.all([
        ConfigurationsActions.get<GeneralSettings>(TAB_TO_KEY.general),
        ConfigurationsActions.get<FactorsSettings>(TAB_TO_KEY.factors),
        ConfigurationsActions.get<SourcesSettings>(TAB_TO_KEY.sources),
        ConfigurationsActions.get<NotificationsSettings>(TAB_TO_KEY.notifications),
      ]);
      if (cancelled) return;
      if (g?.configValue) setGeneral({ ...DEFAULT_GENERAL, ...g.configValue });
      if (f?.configValue) setFactors({ ...DEFAULT_FACTORS, ...f.configValue });
      if (s?.configValue) setSources({ ...DEFAULT_SOURCES, ...s.configValue });
      if (n?.configValue) setNotifications({ ...DEFAULT_NOTIFICATIONS, ...n.configValue });
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const onSave = async () => {
    setSaving(true);
    try {
      const map = {
        general: general,
        factors: factors,
        sources: sources,
        notifications: notifications,
      };
      await ConfigurationsActions.save(TAB_TO_KEY[activeTab], map[activeTab]);
      message.success("Settings saved");
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
            ⚙️ Configuration
          </h1>
          <p style={{ fontSize: "16px", color: "#64748b" }}>
            Manage your organization settings and preferences
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", borderBottom: "2px solid #e2e8f0", marginBottom: "32px" }}>
          <Tab label="General" active={activeTab === "general"} onClick={() => setActiveTab("general")} />
          <Tab label="Emission Factors" active={activeTab === "factors"} onClick={() => setActiveTab("factors")} />
          <Tab label="Data Sources" active={activeTab === "sources"} onClick={() => setActiveTab("sources")} />
          <Tab label="Notifications" active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
        </div>

        {loading ? (
          <div style={{ color: "#64748b" }}>Loading…</div>
        ) : (
          <>
            {activeTab === "general" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <SettingCard title="Organization Information" description="Basic information about your organization">
                  <EditableField label="Organization Name" value={general.organizationName} onChange={(v) => setGeneral({ ...general, organizationName: v })} />
                  <EditableField label="Industry" value={general.industry} onChange={(v) => setGeneral({ ...general, industry: v })} />
                  <EditableField label="Headquarters" value={general.headquarters} onChange={(v) => setGeneral({ ...general, headquarters: v })} />
                  <EditableField label="Fiscal Year Start" value={general.fiscalYearStart} onChange={(v) => setGeneral({ ...general, fiscalYearStart: v })} />
                </SettingCard>

                <SettingCard title="Reporting Standards" description="Configure your emission reporting standards">
                  <SelectField label="Primary Standard" value={general.primaryStandard} options={["GHG Protocol", "ISO 14064-1", "CDP"]} onChange={(v) => setGeneral({ ...general, primaryStandard: v })} />
                  <EditableField label="Secondary Standards" value={general.secondaryStandards} onChange={(v) => setGeneral({ ...general, secondaryStandards: v })} />
                  <SelectField label="Operational Boundary" value={general.operationalBoundary} options={["Operational Control", "Financial Control", "Equity Share"]} onChange={(v) => setGeneral({ ...general, operationalBoundary: v })} />
                </SettingCard>

                <SettingCard title="Regional Settings" description="Configure regional and localization settings">
                  <EditableField label="Time Zone" value={general.timeZone} onChange={(v) => setGeneral({ ...general, timeZone: v })} />
                  <SelectField label="Date Format" value={general.dateFormat} options={["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]} onChange={(v) => setGeneral({ ...general, dateFormat: v })} />
                  <SelectField label="Currency" value={general.currency} options={["USD", "EUR", "GBP", "INR"]} onChange={(v) => setGeneral({ ...general, currency: v })} />
                  <SelectField label="Units System" value={general.unitsSystem} options={["Metric", "Imperial"]} onChange={(v) => setGeneral({ ...general, unitsSystem: v })} />
                </SettingCard>
              </div>
            )}

            {activeTab === "factors" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <SettingCard title="Default Emission Factors" description="Configure default emission factors for calculations">
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {factors.defaultFactors.map((f, idx) => (
                      <EmissionFactorRow
                        key={idx}
                        factor={f}
                        onChange={(next) => {
                          const arr = factors.defaultFactors.slice();
                          arr[idx] = next;
                          setFactors({ ...factors, defaultFactors: arr });
                        }}
                      />
                    ))}
                  </div>
                </SettingCard>

                <SettingCard title="Calculation Methods" description="Configure calculation methodologies">
                  <SelectField label="Scope 1 Method" value={factors.scope1Method} options={["Activity-based", "Spend-based", "Direct Emissions"]} onChange={(v) => setFactors({ ...factors, scope1Method: v })} />
                  <SelectField label="Scope 2 Method" value={factors.scope2Method} options={["Location-based", "Market-based", "Location-based & Market-based"]} onChange={(v) => setFactors({ ...factors, scope2Method: v })} />
                  <SelectField label="Scope 3 Method" value={factors.scope3Method} options={["Activity-based", "Spend-based", "Hybrid (Activity & Spend-based)"]} onChange={(v) => setFactors({ ...factors, scope3Method: v })} />
                </SettingCard>
              </div>
            )}

            {activeTab === "sources" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <SettingCard title="Connected Data Sources" description="Manage integrations with external data sources">
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {sources.dataSources.map((d, idx) => (
                      <DataSourceRow
                        key={idx}
                        source={d}
                        onChange={(next) => {
                          const arr = sources.dataSources.slice();
                          arr[idx] = next;
                          setSources({ dataSources: arr });
                        }}
                        onRemove={() => {
                          const arr = sources.dataSources.filter((_, i) => i !== idx);
                          setSources({ dataSources: arr });
                        }}
                      />
                    ))}
                  </div>
                </SettingCard>

                <button
                  onClick={() => setSources({ dataSources: [...sources.dataSources, { name: "New source", type: "Manual Upload", status: "Not Connected" }] })}
                  style={{
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #2dd4bf, #059669)",
                    color: "white",
                    width: "fit-content",
                  }}
                >
                  + Add New Data Source
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <SettingCard title="Email Notifications" description="Configure email notification preferences">
                  {Object.keys(notifications.emailNotifications).map((label) => (
                    <NotificationToggle
                      key={label}
                      label={label}
                      enabled={notifications.emailNotifications[label]}
                      onChange={(v) => setNotifications({ ...notifications, emailNotifications: { ...notifications.emailNotifications, [label]: v } })}
                    />
                  ))}
                </SettingCard>

                <SettingCard title="Alert Thresholds" description="Configure automatic alerts for data quality issues">
                  <EditableField label="Missing Data Threshold" value={notifications.missingDataThreshold} onChange={(v) => setNotifications({ ...notifications, missingDataThreshold: v })} />
                  <EditableField label="Data Age Alert" value={notifications.dataAgeAlert} onChange={(v) => setNotifications({ ...notifications, dataAgeAlert: v })} />
                  <NotificationToggle label="Anomaly Detection" enabled={notifications.anomalyDetection} onChange={(v) => setNotifications({ ...notifications, anomalyDetection: v })} />
                </SettingCard>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #e2e8f0" }}>
              <button
                onClick={onSave}
                disabled={saving}
                style={{
                  padding: "12px 32px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: saving ? "not-allowed" : "pointer",
                  background: "linear-gradient(135deg, #2dd4bf, #059669)",
                  color: "white",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function SettingCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>{description}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>{children}</div>
    </div>
  );
}

function EditableField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500, minWidth: 200 }}>{label}</span>
      <Input value={value} onChange={(e) => onChange(e.target.value)} style={{ maxWidth: 360 }} />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500, minWidth: 200 }}>{label}</span>
      <Select
        value={value}
        onChange={onChange}
        style={{ minWidth: 240 }}
        options={options.map((o) => ({ value: o, label: o }))}
      />
    </div>
  );
}

function EmissionFactorRow({ factor, onChange }: { factor: EmissionFactor; onChange: (next: EmissionFactor) => void }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, border: "1px solid #e2e8f0", borderRadius: 8 }}>
      <Input value={factor.source} onChange={(e) => onChange({ ...factor, source: e.target.value })} placeholder="Source" style={{ flex: 1 }} />
      <Input value={factor.region} onChange={(e) => onChange({ ...factor, region: e.target.value })} placeholder="Region" style={{ flex: 1 }} />
      <Select
        value={factor.status}
        onChange={(v) => onChange({ ...factor, status: v })}
        style={{ width: 140 }}
        options={[{ value: "Active", label: "Active" }, { value: "Inactive", label: "Inactive" }]}
      />
    </div>
  );
}

function DataSourceRow({ source, onChange, onRemove }: { source: DataSource; onChange: (next: DataSource) => void; onRemove: () => void }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, border: "1px solid #e2e8f0", borderRadius: 8 }}>
      <Input value={source.name} onChange={(e) => onChange({ ...source, name: e.target.value })} placeholder="Name" style={{ flex: 1 }} />
      <Select
        value={source.type}
        onChange={(v) => onChange({ ...source, type: v })}
        style={{ width: 180 }}
        options={[{ value: "Manual Upload", label: "Manual Upload" }, { value: "API Integration", label: "API Integration" }]}
      />
      <Select
        value={source.status}
        onChange={(v) => onChange({ ...source, status: v as DataSource["status"] })}
        style={{ width: 160 }}
        options={[
          { value: "Connected", label: "Connected" },
          { value: "Pending", label: "Pending" },
          { value: "Not Connected", label: "Not Connected" },
        ]}
      />
      <button onClick={onRemove} style={{ padding: "6px 12px", background: "white", border: "1px solid #fecaca", color: "#dc2626", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
        Remove
      </button>
    </div>
  );
}

function NotificationToggle({ label, enabled, onChange }: { label: string; enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>{label}</span>
      <Switch checked={enabled} onChange={onChange} />
    </div>
  );
}
