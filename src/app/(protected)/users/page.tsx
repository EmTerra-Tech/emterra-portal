"use client";

import { useEffect, useMemo, useState } from "react";
import { Form, Input, message, Modal, Select, Tag } from "antd";
import DashboardLayout from "../../../components/dashboard-layout";
import UsersActions, { User, UserRole } from "@/service/users/actions";

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "ROLE_COMPANY_ADMIN", label: "Company Admin" },
  { value: "ROLE_COMPANY_VIEWER", label: "Company Viewer" },
  { value: "ROLE_BRANCH_ADMIN", label: "Branch Admin" },
  { value: "ROLE_BRANCH_EDITOR", label: "Branch Editor" },
  { value: "ROLE_BRANCH_VIEWER", label: "Branch Viewer" },
];

function getCurrentUserRoles(): UserRole[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("user");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.roles) ? parsed.roles : [];
  } catch {
    return [];
  }
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  const [inviteOpen, setInviteOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form] = Form.useForm();

  const myRoles = useMemo(getCurrentUserRoles, []);
  const canDelete = myRoles.includes("ROLE_COMPANY_ADMIN");

  const refresh = async () => {
    setLoading(true);
    try {
      setUsers(await UsersActions.list());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return users.filter((u) => {
      if (q) {
        const hay = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (roleFilter !== "ALL" && !u.roles?.includes(roleFilter)) return false;
      if (statusFilter === "ACTIVE" && !u.isActive) return false;
      if (statusFilter === "INACTIVE" && u.isActive) return false;
      return true;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.isActive).length;
    const admins = users.filter((u) => u.roles?.some((r) => r === "ROLE_COMPANY_ADMIN" || r === "ROLE_BRANCH_ADMIN")).length;
    return { total, active, admins };
  }, [users]);

  const openInvite = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ roles: ["ROLE_BRANCH_VIEWER"] });
    setInviteOpen(true);
  };

  const openEdit = (u: User) => {
    setEditing(u);
    form.setFieldsValue({
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      jobTitle: u.jobTitle,
      roles: u.roles,
      isActive: u.isActive,
    });
    setInviteOpen(true);
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await UsersActions.update(editing.id, {
          firstName: values.firstName,
          lastName: values.lastName,
          jobTitle: values.jobTitle,
          roles: values.roles,
          isActive: values.isActive,
        });
        message.success("User updated");
      } else {
        await UsersActions.invite({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          jobTitle: values.jobTitle,
          roles: values.roles,
        });
        message.success("Invitation sent");
      }
      setInviteOpen(false);
      await refresh();
    } catch (e: any) {
      if (e?.errorFields) return; // form validation error
      message.error(e?.response?.data?.message || "Failed to save");
    }
  };

  const onDelete = async (u: User) => {
    Modal.confirm({
      title: `Remove ${u.firstName} ${u.lastName}?`,
      content: "This will deactivate the user.",
      okText: "Remove",
      okType: "danger",
      onOk: async () => {
        try {
          await UsersActions.remove(u.id);
          message.success("User removed");
          await refresh();
        } catch (e: any) {
          message.error(e?.response?.data?.message || "Failed to remove user");
        }
      },
    });
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
              👥 Users
            </h1>
            <p style={{ fontSize: "16px", color: "#64748b" }}>
              Manage user accounts and permissions
            </p>
          </div>
          <button
            onClick={openInvite}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              background: "linear-gradient(135deg, #2dd4bf, #059669)",
              color: "white",
            }}
          >
            + Invite User
          </button>
        </div>

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
          <Select
            value={roleFilter}
            onChange={(v) => setRoleFilter(v)}
            style={{ width: 200 }}
            options={[
              { value: "ALL", label: "All Roles" },
              ...ROLE_OPTIONS,
            ]}
          />
          <Select
            value={statusFilter}
            onChange={(v) => setStatusFilter(v)}
            style={{ width: 160 }}
            options={[
              { value: "ALL", label: "All Status" },
              { value: "ACTIVE", label: "Active" },
              { value: "INACTIVE", label: "Inactive" },
            ]}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <StatCard label="Total Users" value={String(stats.total)} trend="" />
          <StatCard label="Active Users" value={String(stats.active)} trend={stats.total > 0 ? `${((stats.active / stats.total) * 100).toFixed(1)}%` : ""} />
          <StatCard label="Admins" value={String(stats.admins)} trend={stats.total > 0 ? `${((stats.admins / stats.total) * 100).toFixed(1)}% of total` : ""} />
        </div>

        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                <th style={th}>User</th>
                <th style={th}>Roles</th>
                <th style={th}>Status</th>
                <th style={th}>Last Active</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td style={{ padding: 24, color: "#64748b" }} colSpan={5}>Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td style={{ padding: 24, color: "#64748b" }} colSpan={5}>No users found.</td></tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={td}>
                      <div style={{ fontWeight: 600, color: "#1e293b" }}>{u.firstName} {u.lastName}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{u.email}</div>
                      {u.jobTitle && <div style={{ fontSize: 12, color: "#64748b" }}>{u.jobTitle}</div>}
                    </td>
                    <td style={td}>
                      {(u.roles || []).map((r) => (
                        <Tag key={r} color={r.includes("ADMIN") ? "geekblue" : "default"} style={{ marginBottom: 4 }}>
                          {ROLE_OPTIONS.find((o) => o.value === r)?.label || r}
                        </Tag>
                      ))}
                    </td>
                    <td style={td}>
                      <Tag color={u.isActive ? "green" : "default"}>{u.isActive ? "Active" : "Inactive"}</Tag>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: 13, color: "#64748b" }}>
                        {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : "Never"}
                      </span>
                    </td>
                    <td style={td}>
                      <button onClick={() => openEdit(u)} style={btn("ghost")}>Edit</button>
                      {canDelete && (
                        <button onClick={() => onDelete(u)} style={btn("danger")}>Remove</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title={editing ? `Edit ${editing.firstName} ${editing.lastName}` : "Invite User"}
        open={inviteOpen}
        onCancel={() => setInviteOpen(false)}
        onOk={onSubmit}
        okText={editing ? "Save" : "Send invite"}
      >
        <Form form={form} layout="vertical">
          <div style={{ display: "flex", gap: 12 }}>
            <Form.Item name="firstName" label="First name" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last name" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input />
            </Form.Item>
          </div>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input disabled={!!editing} />
          </Form.Item>
          <Form.Item name="jobTitle" label="Job title">
            <Input />
          </Form.Item>
          <Form.Item name="roles" label="Roles" rules={[{ required: true, message: "Select at least one role" }]}>
            <Select mode="multiple" options={ROLE_OPTIONS} />
          </Form.Item>
          {editing && (
            <Form.Item name="isActive" label="Status">
              <Select
                options={[
                  { value: true, label: "Active" },
                  { value: false, label: "Inactive" },
                ]}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </DashboardLayout>
  );
}

const th: React.CSSProperties = { padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" };
const td: React.CSSProperties = { padding: "16px", fontSize: "14px", color: "#1e293b" };
const btn = (variant: "ghost" | "danger" | "primary"): React.CSSProperties => ({
  padding: "6px 12px",
  marginRight: 8,
  border: variant === "ghost" ? "1px solid #e5e7eb" : variant === "danger" ? "1px solid #fecaca" : "none",
  background: variant === "primary" ? "linear-gradient(135deg, #2dd4bf, #059669)" : "white",
  color: variant === "danger" ? "#dc2626" : variant === "primary" ? "white" : "#1e293b",
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
});

function StatCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "16px",
    }}>
      <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "24px", fontWeight: 700, color: "#1e293b" }}>{value}</div>
      {trend && <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: 4 }}>{trend}</div>}
    </div>
  );
}
