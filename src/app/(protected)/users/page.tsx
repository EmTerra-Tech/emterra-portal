"use client";

import DashboardLayout from "../../../components/dashboard-layout";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Tag, Space, message, Popconfirm, Avatar } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserActions, UserInviteRequest, UserUpdateRequest } from '@/service/user/actions';
import { useAuth } from '@/context/AuthContext';
import type { ColumnsType } from 'antd/es/table';

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  roles: string[];
  assignedBranchIds: number[];
  isActive: boolean;
  lastLoginAt?: string;
}

const ROLE_OPTIONS = [
  { label: 'Company Admin', value: 'ROLE_COMPANY_ADMIN' },
  { label: 'Company Viewer', value: 'ROLE_COMPANY_VIEWER' },
  { label: 'Branch Admin', value: 'ROLE_BRANCH_ADMIN' },
  { label: 'Branch Editor', value: 'ROLE_BRANCH_EDITOR' },
  { label: 'Branch Viewer', value: 'ROLE_BRANCH_VIEWER' },
];

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [form] = Form.useForm();

  const { branches, canManageUsers, isLoading: authLoading } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await UserActions.getAllUsers();
      setUsers(data || []);
    } catch (error) {
      message.error('Failed to load users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteUser = async (values: any) => {
    try {
      const request: UserInviteRequest = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        jobTitle: values.jobTitle,
        roles: values.roles,
        assignedBranchIds: values.assignedBranchIds || [],
      };
      await UserActions.inviteUser(request);
      message.success('User invited successfully');
      setInviteModalOpen(false);
      form.resetFields();
      loadUsers();
    } catch (error) {
      message.error('Failed to invite user');
      console.error(error);
    }
  };

  const handleUpdateUser = async (values: any) => {
    if (!selectedUser) return;

    try {
      const request: UserUpdateRequest = {
        firstName: values.firstName,
        lastName: values.lastName,
        jobTitle: values.jobTitle,
        roles: values.roles,
        assignedBranchIds: values.assignedBranchIds || [],
        isActive: values.isActive,
      };
      await UserActions.updateUser(selectedUser.id, request);
      message.success('User updated successfully');
      setEditModalOpen(false);
      setSelectedUser(null);
      form.resetFields();
      loadUsers();
    } catch (error) {
      message.error('Failed to update user');
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await UserActions.deleteUser(userId);
      message.success('User deleted successfully');
      loadUsers();
    } catch (error) {
      message.error('Failed to delete user');
      console.error(error);
    }
  };

  const openEditModal = (user: UserData) => {
    setSelectedUser(user);
    form.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      jobTitle: user.jobTitle,
      roles: user.roles,
      assignedBranchIds: user.assignedBranchIds,
      isActive: user.isActive,
    });
    setEditModalOpen(true);
  };

  const getRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
      'ROLE_COMPANY_ADMIN': 'gold',
      'ROLE_COMPANY_VIEWER': 'cyan',
      'ROLE_BRANCH_ADMIN': 'blue',
      'ROLE_BRANCH_EDITOR': 'green',
      'ROLE_BRANCH_VIEWER': 'default',
    };
    return roleColors[role] || 'default';
  };

  const getRoleLabel = (role: string) => {
    return role.replace('ROLE_', '').replace(/_/g, ' ');
  };

  const columns: ColumnsType<UserData> = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }}>
            {record.firstName[0]}{record.lastName[0]}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{record.firstName} {record.lastName}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role(s)',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => (
        <>
          {roles.map(role => (
            <Tag key={role} color={getRoleColor(role)}>
              {getRoleLabel(role)}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: 'Status',
      key: 'isActive',
      dataIndex: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'success' : 'error'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLoginAt',
      key: 'lastLoginAt',
      render: (lastLoginAt?: string) => lastLoginAt ? new Date(lastLoginAt).toLocaleString() : 'Never',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {!authLoading && canManageUsers() && (
            <>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => openEditModal(record)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Delete user"
                description="Are you sure you want to delete this user?"
                onConfirm={() => handleDeleteUser(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>
              Users Management
            </h1>
            <p style={{ fontSize: "16px", color: "#666" }}>
              Manage user accounts and permissions
            </p>
          </div>
          {!authLoading && canManageUsers() && (
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => setInviteModalOpen(true)}
              size="large"
            >
              Invite User
            </Button>
          )}
        </div>

        {/* Users Table */}
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        {/* Invite User Modal */}
        <Modal
          title="Invite New User"
          open={inviteModalOpen}
          onCancel={() => {
            setInviteModalOpen(false);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleInviteUser}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input placeholder="user@example.com" />
            </Form.Item>

            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="John" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input placeholder="Doe" />
            </Form.Item>

            <Form.Item name="jobTitle" label="Job Title">
              <Input placeholder="Sustainability Manager" />
            </Form.Item>

            <Form.Item
              name="roles"
              label="Roles"
              rules={[{ required: true, message: 'Please select at least one role' }]}
            >
              <Select mode="multiple" options={ROLE_OPTIONS} placeholder="Select roles" />
            </Form.Item>

            <Form.Item name="assignedBranchIds" label="Assigned Branches">
              <Select
                mode="multiple"
                options={branches.map(b => ({ label: b.name, value: b.id }))}
                placeholder="Select branches (optional for company-level roles)"
              />
            </Form.Item>

            <Form.Item>
              <Space style={{ float: 'right' }}>
                <Button onClick={() => { setInviteModalOpen(false); form.resetFields(); }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Send Invitation
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit User Modal */}
        <Modal
          title="Edit User"
          open={editModalOpen}
          onCancel={() => {
            setEditModalOpen(false);
            setSelectedUser(null);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleUpdateUser}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="jobTitle" label="Job Title">
              <Input />
            </Form.Item>

            <Form.Item
              name="roles"
              label="Roles"
              rules={[{ required: true, message: 'Please select at least one role' }]}
            >
              <Select mode="multiple" options={ROLE_OPTIONS} />
            </Form.Item>

            <Form.Item name="assignedBranchIds" label="Assigned Branches">
              <Select
                mode="multiple"
                options={branches.map(b => ({ label: b.name, value: b.id }))}
                placeholder="Select branches"
              />
            </Form.Item>

            <Form.Item name="isActive" label="Status" valuePropName="checked">
              <Select>
                <Select.Option value={true}>Active</Select.Option>
                <Select.Option value={false}>Inactive</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space style={{ float: 'right' }}>
                <Button onClick={() => { setEditModalOpen(false); setSelectedUser(null); form.resetFields(); }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Update User
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
