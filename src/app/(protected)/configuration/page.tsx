"use client";

import DashboardLayout from "../../../components/dashboard-layout";
import { useState, useEffect } from "react";
import { Tabs, Form, Input, InputNumber, Switch, Button, message, Card } from 'antd';
import { SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { ConfigurationActions } from '@/service/configuration/actions';
import { useAuth } from '@/context/AuthContext';

const { TextArea } = Input;

export default function ConfigurationPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generalForm] = Form.useForm();
  const [emissionFactorsForm] = Form.useForm();
  const [dataSourcesForm] = Form.useForm();
  const [notificationsForm] = Form.useForm();

  const { canManageConfiguration, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && canManageConfiguration()) {
      loadAllConfigurations();
    }
  }, [authLoading]);

  const loadAllConfigurations = async () => {
    try {
      setLoading(true);
      const configs = await ConfigurationActions.getAllConfigurations();

      // Populate forms with existing configurations
      configs.forEach((config: any) => {
        const value = config.configValue;

        if (config.configKey.startsWith('general.')) {
          generalForm.setFieldValue(config.configKey, value);
        } else if (config.configKey.startsWith('emissionFactors.')) {
          emissionFactorsForm.setFieldValue(config.configKey, value);
        } else if (config.configKey.startsWith('dataSources.')) {
          dataSourcesForm.setFieldValue(config.configKey, value);
        } else if (config.configKey.startsWith('notifications.')) {
          notificationsForm.setFieldValue(config.configKey, value);
        }
      });
    } catch (error) {
      message.error('Failed to load configurations');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGeneralSettings = async (values: any) => {
    try {
      setSaving(true);
      for (const [key, value] of Object.entries(values)) {
        await ConfigurationActions.saveConfiguration({ configKey: key, configValue: value });
      }
      message.success('General settings saved successfully');
    } catch (error) {
      message.error('Failed to save general settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEmissionFactors = async (values: any) => {
    try {
      setSaving(true);
      for (const [key, value] of Object.entries(values)) {
        await ConfigurationActions.saveConfiguration({ configKey: key, configValue: value });
      }
      message.success('Emission factors saved successfully');
    } catch (error) {
      message.error('Failed to save emission factors');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDataSources = async (values: any) => {
    try {
      setSaving(true);
      for (const [key, value] of Object.entries(values)) {
        await ConfigurationActions.saveConfiguration({ configKey: key, configValue: value });
      }
      message.success('Data sources saved successfully');
    } catch (error) {
      message.error('Failed to save data sources');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async (values: any) => {
    try {
      setSaving(true);
      for (const [key, value] of Object.entries(values)) {
        await ConfigurationActions.saveConfiguration({ configKey: key, configValue: value });
      }
      message.success('Notification settings saved successfully');
    } catch (error) {
      message.error('Failed to save notification settings');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div style={{ padding: "24px", textAlign: "center" }}>
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!canManageConfiguration()) {
    return (
      <DashboardLayout>
        <div style={{ padding: "24px", textAlign: "center" }}>
          <h2>Access Denied</h2>
          <p>You do not have permission to access configuration settings.</p>
        </div>
      </DashboardLayout>
    );
  }

  const tabItems = [
    {
      key: 'general',
      label: 'General',
      children: (
        <Card loading={loading}>
          <Form form={generalForm} layout="vertical" onFinish={handleSaveGeneralSettings}>
            <Form.Item name="general.companyName" label="Company Name">
              <Input placeholder="Enter company name" />
            </Form.Item>
            <Form.Item name="general.fiscalYearStart" label="Fiscal Year Start Month">
              <Input placeholder="e.g., January" />
            </Form.Item>
            <Form.Item name="general.reportingBoundary" label="Reporting Boundary">
              <TextArea rows={3} placeholder="Describe organizational boundary" />
            </Form.Item>
            <Form.Item name="general.defaultCurrency" label="Default Currency">
              <Input placeholder="e.g., USD" />
            </Form.Item>
            <Form.Item name="general.timeZone" label="Time Zone">
              <Input placeholder="e.g., America/New_York" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving}>
                Save General Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'emissionFactors',
      label: 'Emission Factors',
      children: (
        <Card loading={loading}>
          <Form form={emissionFactorsForm} layout="vertical" onFinish={handleSaveEmissionFactors}>
            <Form.Item name="emissionFactors.electricityGrid" label="Electricity Grid Factor (kg CO2e/kWh)">
              <InputNumber min={0} step={0.001} style={{ width: '100%' }} placeholder="0.385" />
            </Form.Item>
            <Form.Item name="emissionFactors.naturalGas" label="Natural Gas Factor (kg CO2e/m³)">
              <InputNumber min={0} step={0.001} style={{ width: '100%' }} placeholder="1.879" />
            </Form.Item>
            <Form.Item name="emissionFactors.diesel" label="Diesel Factor (kg CO2e/L)">
              <InputNumber min={0} step={0.001} style={{ width: '100%' }} placeholder="2.68" />
            </Form.Item>
            <Form.Item name="emissionFactors.gasoline" label="Gasoline Factor (kg CO2e/L)">
              <InputNumber min={0} step={0.001} style={{ width: '100%' }} placeholder="2.31" />
            </Form.Item>
            <Form.Item name="emissionFactors.customFactorsEnabled" label="Enable Custom Emission Factors" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving}>
                Save Emission Factors
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'dataSources',
      label: 'Data Sources',
      children: (
        <Card loading={loading}>
          <Form form={dataSourcesForm} layout="vertical" onFinish={handleSaveDataSources}>
            <Form.Item name="dataSources.apiIntegrationEnabled" label="Enable API Integrations" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="dataSources.autoDataSync" label="Automatic Data Synchronization" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="dataSources.syncFrequency" label="Sync Frequency (hours)">
              <InputNumber min={1} max={168} style={{ width: '100%' }} placeholder="24" />
            </Form.Item>
            <Form.Item name="dataSources.dataRetentionPeriod" label="Data Retention Period (days)">
              <InputNumber min={30} max={3650} style={{ width: '100%' }} placeholder="365" />
            </Form.Item>
            <Form.Item name="dataSources.allowManualEntry" label="Allow Manual Data Entry" valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving}>
                Save Data Source Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      children: (
        <Card loading={loading}>
          <Form form={notificationsForm} layout="vertical" onFinish={handleSaveNotifications}>
            <Form.Item name="notifications.emailEnabled" label="Enable Email Notifications" valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item name="notifications.dataReminders" label="Send Data Entry Reminders" valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item name="notifications.reminderFrequency" label="Reminder Frequency (days)">
              <InputNumber min={1} max={30} style={{ width: '100%' }} placeholder="7" />
            </Form.Item>
            <Form.Item name="notifications.reportGeneration" label="Notify on Report Generation" valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item name="notifications.weeklyDigest" label="Send Weekly Digest" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="notifications.alertThreshold" label="Alert Threshold (% change)">
              <InputNumber min={1} max={100} style={{ width: '100%' }} placeholder="20" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving}>
                Save Notification Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <SettingOutlined style={{ fontSize: "28px" }} />
            <h1 style={{ fontSize: "28px", fontWeight: "700", margin: 0 }}>
              Configuration
            </h1>
          </div>
          <p style={{ fontSize: "16px", color: "#666" }}>
            Manage company-wide settings and preferences
          </p>
        </div>
        <Tabs items={tabItems} defaultActiveKey="general" />
      </div>
    </DashboardLayout>
  );
}
