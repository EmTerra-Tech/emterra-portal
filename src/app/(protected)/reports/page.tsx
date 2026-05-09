"use client";

import { useEffect, useMemo, useState } from "react";
import { Modal, Select, Form, message } from "antd";
import DashboardLayout from "../../../components/dashboard-layout";
import ReportsActions, {
  FileFormat,
  Report,
  ReportSummary,
  ReportType,
} from "@/service/reports/actions";
import EmissionsActions from "@/service/emissions/actions";

const REPORT_CARDS: Array<{
  type: ReportType;
  icon: string;
  title: string;
  description: string;
}> = [
  { type: "EMISSIONS_SUMMARY", icon: "📈", title: "Emissions Summary Report", description: "Comprehensive overview of all emissions across scopes" },
  { type: "SCOPE_1", icon: "🔥", title: "Scope 1 Report", description: "Direct emissions from owned or controlled sources" },
  { type: "SCOPE_2", icon: "⚡", title: "Scope 2 Report", description: "Indirect emissions from purchased electricity" },
  { type: "SCOPE_3", icon: "🌐", title: "Scope 3 Report", description: "Other indirect emissions in the value chain" },
  { type: "DATA_QUALITY", icon: "✅", title: "Data Quality Report", description: "Assessment of data completeness and accuracy" },
  { type: "COMPLIANCE", icon: "📋", title: "Compliance Report", description: "GHG Protocol and regulatory compliance report" },
];

export default function ReportsPage() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [availableYears, setAvailableYears] = useState<number[]>([currentYear]);
  const [reports, setReports] = useState<Report[]>([]);
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [generateType, setGenerateType] = useState<ReportType>("EMISSIONS_SUMMARY");
  const [generateFormat, setGenerateFormat] = useState<FileFormat>("CSV");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const years = await EmissionsActions.getAvailableYears();
      if (cancelled) return;
      const merged = years.length > 0 ? years : [currentYear];
      setAvailableYears(merged);
      setSelectedYear(currentYear);
    })();
    return () => {
      cancelled = true;
    };
  }, [currentYear]);

  const refresh = async (year: number) => {
    setLoading(true);
    setSummaryLoading(true);
    try {
      const [list, sum] = await Promise.all([
        ReportsActions.list(year),
        ReportsActions.summary(year),
      ]);
      setReports(list);
      setSummary(sum);
    } finally {
      setLoading(false);
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    refresh(selectedYear);
  }, [selectedYear]);

  const reportsByType = useMemo(() => {
    const map = new Map<ReportType, Report>();
    for (const r of reports) {
      const prev = map.get(r.reportType);
      if (!prev || new Date(r.createdAt) > new Date(prev.createdAt)) map.set(r.reportType, r);
    }
    return map;
  }, [reports]);

  const onGenerate = async () => {
    setGenerating(true);
    try {
      await ReportsActions.generate({
        reportType: generateType,
        reportYear: selectedYear,
        fileFormat: generateFormat,
      });
      message.success("Report generated");
      setGenerateOpen(false);
      await refresh(selectedYear);
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Failed to generate report");
    } finally {
      setGenerating(false);
    }
  };

  const onDownload = async (report: Report) => {
    try {
      await ReportsActions.download(report);
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Failed to download report");
    }
  };

  const onDelete = async (reportId: string) => {
    try {
      await ReportsActions.remove(reportId);
      message.success("Report deleted");
      await refresh(selectedYear);
    } catch (e: any) {
      message.error(e?.response?.data?.message || "Failed to delete report");
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
            📊 Reports & Analytics
          </h1>
          <p style={{ fontSize: "16px", color: "#64748b" }}>
            View and download emission reports for your organization
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginRight: "12px" }}>
              Reporting Year:
            </label>
            <Select
              value={selectedYear}
              onChange={(y) => setSelectedYear(y)}
              style={{ width: 160 }}
              options={availableYears.map((y) => ({
                value: y,
                label: y === currentYear ? `${y} (Current)` : `${y}`,
              }))}
            />
          </div>
          <button
            onClick={() => setGenerateOpen(true)}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #2dd4bf, #059669)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Generate Report
          </button>
        </div>

        <SummaryPanel summary={summary} loading={summaryLoading} year={selectedYear} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "32px" }}>
          {REPORT_CARDS.map((c) => {
            const existing = reportsByType.get(c.type);
            const status = existing ? existing.status : "Not generated";
            const statusColor = existing?.status === "COMPLETED" ? "#10b981" : existing ? "#f59e0b" : "#94a3b8";
            return (
              <ReportCard
                key={c.type}
                icon={c.icon}
                title={c.title}
                description={c.description}
                status={status}
                statusColor={statusColor}
                onAction={existing && existing.status === "COMPLETED" ? () => onDownload(existing) : () => {
                  setGenerateType(c.type);
                  setGenerateOpen(true);
                }}
                actionLabel={existing && existing.status === "COMPLETED" ? "Download" : "Generate"}
              />
            );
          })}
        </div>

        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "16px" }}>
            Recent Reports
          </h3>
          {loading ? (
            <div style={{ color: "#64748b" }}>Loading…</div>
          ) : reports.length === 0 ? (
            <div style={{ color: "#64748b" }}>No reports yet. Generate one above.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {reports.map((r) => (
                <RecentReportItem
                  key={r.id}
                  name={`${r.reportType.replaceAll("_", " ")} - ${r.reportYear}`}
                  date={r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                  format={r.fileFormat}
                  onDownload={() => onDownload(r)}
                  onDelete={() => onDelete(r.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Generate Report"
        open={generateOpen}
        onCancel={() => setGenerateOpen(false)}
        onOk={onGenerate}
        confirmLoading={generating}
        okText="Generate"
      >
        <Form layout="vertical">
          <Form.Item label="Report Type">
            <Select
              value={generateType}
              onChange={(v) => setGenerateType(v as ReportType)}
              options={REPORT_CARDS.map((c) => ({ value: c.type, label: c.title }))}
            />
          </Form.Item>
          <Form.Item label="Year">
            <Select
              value={selectedYear}
              onChange={(y) => setSelectedYear(y as number)}
              options={availableYears.map((y) => ({
                value: y,
                label: y === currentYear ? `${y} (Current)` : `${y}`,
              }))}
            />
          </Form.Item>
          <Form.Item label="Format">
            <Select
              value={generateFormat}
              onChange={(v) => setGenerateFormat(v as FileFormat)}
              options={[
                { value: "CSV", label: "CSV" },
                { value: "EXCEL", label: "Excel" },
                { value: "PDF", label: "PDF" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
}

const SCOPE_PRETTY: Record<string, string> = {
  SCOPE1_STATIONARY_COMBUSTION: "Stationary Combustion",
  SCOPE1_MOBILE_COMBUSTION: "Mobile Combustion",
  SCOPE1_FUGITIVE_EMISSIONS: "Refrigerants",
  SCOPE2_PURCHASED_ELECTRICITY: "Purchased Electricity (Facilities)",
  SCOPE2_PURCHASED_ELECTRICITY_VEHICLES: "Purchased Electricity (Vehicles)",
  SCOPE2_HEATING_COOLING: "Purchased Heat & Steam",
  SCOPE2_PURCHASED_STEAM: "Purchased Steam",
  SCOPE2_PURCHASED_COOLING: "Purchased Cooling",
};

const fmtNumber = (n: number, fractionDigits = 2) =>
  Number.isFinite(n)
    ? n.toLocaleString(undefined, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      })
    : "0";

function SummaryPanel({ summary, loading, year }: { summary: ReportSummary | null; loading: boolean; year: number }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
          {year} Footprint Summary
        </h3>
        {summary && (
          <span style={{ fontSize: "13px", color: "#64748b" }}>
            {summary.entryCount} {summary.entryCount === 1 ? "entry" : "entries"} across {summary.facilitiesCovered}{" "}
            {summary.facilitiesCovered === 1 ? "facility" : "facilities"}
          </span>
        )}
      </div>

      {loading ? (
        <div style={{ color: "#64748b" }}>Loading…</div>
      ) : !summary || summary.entryCount === 0 ? (
        <div style={{ color: "#64748b" }}>
          No data submitted for {year}. Add emissions data in Data Collection to see totals here.
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
            <SummaryStat label="Total Consumption" value={fmtNumber(summary.totalConsumption)} unit="(per submitted unit)" />
            <SummaryStat label="Total Emissions" value={fmtNumber(summary.totalEmissionsTco2e, 4)} unit="tCO₂e" highlight />
          </div>

          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: "12px" }}>
              By Scope
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {summary.byScope.map((row) => {
                const pct =
                  summary.totalEmissionsTco2e > 0
                    ? Math.round((row.totalEmissionsTco2e / summary.totalEmissionsTco2e) * 100)
                    : 0;
                return (
                  <div key={row.scope} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 12, alignItems: "center" }}>
                    <div style={{ fontWeight: 600, color: "#1e293b", fontSize: 14 }}>
                      {SCOPE_PRETTY[row.scope] ?? row.scope}
                    </div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>
                      Consumption: <span style={{ color: "#1e293b", fontWeight: 600 }}>{fmtNumber(row.totalConsumption)}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>
                      Emissions: <span style={{ color: "#1e293b", fontWeight: 600 }}>{fmtNumber(row.totalEmissionsTco2e, 4)} tCO₂e</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", textAlign: "right" }}>
                      {pct}% of total
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SummaryStat({ label, value, unit, highlight }: { label: string; value: string; unit: string; highlight?: boolean }) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "12px",
        background: highlight ? "linear-gradient(135deg, #ecfdf5, #d1fae5)" : "#f8fafc",
        border: highlight ? "1px solid #6ee7b7" : "1px solid #e2e8f0",
      }}
    >
      <div style={{ fontSize: "13px", color: "#64748b", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: "24px", fontWeight: 700, color: highlight ? "#065f46" : "#1e293b" }}>
        {value}
      </div>
      <div style={{ fontSize: "12px", color: "#64748b", marginTop: 4 }}>{unit}</div>
    </div>
  );
}

interface ReportCardProps {
  icon: string;
  title: string;
  description: string;
  status: string;
  statusColor: string;
  onAction: () => void;
  actionLabel: string;
}

function ReportCard({ icon, title, description, status, statusColor, onAction, actionLabel }: ReportCardProps) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ fontSize: "32px" }}>{icon}</div>
      <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>{title}</h4>
      <p style={{ fontSize: "14px", color: "#64748b" }}>{description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 600,
            color: "white",
            background: statusColor,
          }}
        >
          {status}
        </div>
        <button
          onClick={onAction}
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            border: "none",
            background: "linear-gradient(135deg, #2dd4bf, #059669)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

interface RecentReportItemProps {
  name: string;
  date: string;
  format: FileFormat;
  onDownload: () => void;
  onDelete: () => void;
}

function RecentReportItem({ name, date, format, onDownload, onDelete }: RecentReportItemProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
      }}
    >
      <div>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b" }}>{name}</div>
        <div style={{ fontSize: "12px", color: "#64748b" }}>
          {date} • {format}
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={onDownload}
          style={{
            padding: "6px 16px",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            background: "linear-gradient(135deg, #2dd4bf, #059669)",
            color: "white",
          }}
        >
          Download
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: "6px 12px",
            border: "1px solid #fecaca",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            background: "white",
            color: "#dc2626",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
