"use client";

import DashboardLayout from "../../../components/dashboard-layout";
import { useState, useEffect } from "react";
import { Form, Input, Button, message, Card, Switch, Upload, Avatar } from 'antd';
import { SaveOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import { UserActions } from '@/service/user/actions';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [profileForm] = Form.useForm();
  const [notificationsForm] = Form.useForm();

  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      // Populate profile form
      profileForm.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        jobTitle: user.jobTitle,
        email: user.email,
      });

      // TODO: Parse notification preferences from JSON string if needed
      // For now, set defaults
      notificationsForm.setFieldsValue({
        email: true,
        dataReminders: true,
        reportGeneration: true,
        weeklyDigest: false,
      });
    }
  }, [user]);

  const handleSaveProfile = async (values: any) => {
    try {
      setLoading(true);
      const updatedUser = await UserActions.updateSettings({
        firstName: values.firstName,
        lastName: values.lastName,
        jobTitle: values.jobTitle,
        avatarUrl: values.avatarUrl,
      });

      // Update user in context
      setUser(updatedUser);
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async (values: any) => {
    try {
      setLoading(true);
      await UserActions.updateSettings({
        notificationPreferences: {
          email: values.email,
          dataReminders: values.dataReminders,
          reportGeneration: values.reportGeneration,
          weeklyDigest: values.weeklyDigest,
        },
      });
      message.success('Notification preferences updated successfully');
    } catch (error) {
      message.error('Failed to update notification preferences');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      // In production, this would upload to a cloud storage service
      message.success('Avatar uploaded successfully');
      // Update avatar URL in form
      profileForm.setFieldValue('avatarUrl', info.file.response.url);
    } else if (info.file.status === 'error') {
      message.error('Avatar upload failed');
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>
            Settings
          </h1>
          <p style={{ fontSize: "16px", color: "#666" }}>
            Manage your profile and preferences
          </p>
        </div>

        {/* Profile Information Card */}
        <Card
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <UserOutlined />
              <span>Profile Information</span>
            </div>
          }
          style={{ marginBottom: "24px" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", marginBottom: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <Avatar
                size={100}
                src={user?.avatarUrl}
                style={{ backgroundColor: '#1890ff', marginBottom: "12px" }}
              >
                {user && `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()}
              </Avatar>
              <Upload
                accept="image/*"
                showUploadList={false}
                onChange={handleAvatarUpload}
                customRequest={({ file, onSuccess }: any) => {
                  // Mock upload - in production, upload to cloud storage
                  setTimeout(() => {
                    onSuccess({ url: URL.createObjectURL(file) });
                  }, 1000);
                }}
              >
                <Button icon={<UploadOutlined />} size="small">
                  Change Photo
                </Button>
              </Upload>
            </div>

            <div style={{ flex: 1 }}>
              <Form form={profileForm} layout="vertical" onFinish={handleSaveProfile}>
                <Form.Item name="avatarUrl" hidden>
                  <Input />
                </Form.Item>

                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                  <Input placeholder="John" />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                  <Input placeholder="Doe" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item name="jobTitle" label="Job Title">
                  <Input placeholder="Sustainability Manager" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                    Save Profile
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Card>

        {/* Notification Preferences Card */}
        <Card
          title="Notification Preferences"
          style={{ marginBottom: "24px" }}
        >
          <Form form={notificationsForm} layout="vertical" onFinish={handleSaveNotifications}>
            <Form.Item
              name="email"
              label="Email Notifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "-16px", marginBottom: "16px" }}>
              Receive general email notifications
            </p>

            <Form.Item
              name="dataReminders"
              label="Data Entry Reminders"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "-16px", marginBottom: "16px" }}>
              Get reminded to submit monthly data
            </p>

            <Form.Item
              name="reportGeneration"
              label="Report Generation Alerts"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "-16px", marginBottom: "16px" }}>
              Notify when reports are ready to download
            </p>

            <Form.Item
              name="weeklyDigest"
              label="Weekly Digest"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "-16px", marginBottom: "16px" }}>
              Receive a weekly summary of your emissions data
            </p>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                Save Preferences
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Company Information Card (Read-only for now) */}
        {user?.company && (
          <Card
            title="Company Information"
            style={{ marginBottom: "24px" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>Company Name</div>
                <div style={{ fontWeight: 600 }}>{user.company.name}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>Industry</div>
                <div style={{ fontWeight: 600 }}>{user.company.industry}</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
