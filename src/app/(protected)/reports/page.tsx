"use client";

import DashboardLayout from "../../../components/dashboard-layout";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Select, Tag, Space, message, Tooltip } from 'antd';
import { FileTextOutlined, DownloadOutlined, DeleteOutlined, FilePdfOutlined, FileExcelOutlined, FileOutlined } from '@ant-design/icons';
import { ReportsActions, ReportGenerateRequest } from '@/service/reports/actions';
import { useAuth } from '@/context/AuthContext';
import type { ColumnsType } from 'antd/es/table';

interface ReportData {
  id: number;
  reportType: string;
  reportYear: number;
  branchId?: number;
  branchName?: string;
  fileFormat: string;
  fileUrl?: string;
  fileSizeBytes?: number;
  status: string;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
}

const REPORT_TYPES = [
  { label: 'Emissions Summary', value: 'EMISSIONS_SUMMARY' },
  { label: 'Scope 1', value: 'SCOPE_1' },
  { label: 'Scope 2', value: 'SCOPE_2' },
  { label: 'Scope 3', value: 'SCOPE_3' },
  { label: 'Data Quality', value: 'DATA_QUALITY' },
  { label: 'Compliance', value: 'COMPLIANCE' },
];

const FILE_FORMATS = [
  { label: 'PDF', value: 'PDF' },
  { label: 'Excel', value: 'EXCEL' },
  { label: 'CSV', value: 'CSV' },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(false);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { branches, selectedBranchId, hasAnyRole, canManageConfiguration, isLoading: authLoading } = useAuth();

  useEffect(() => {
    loadReports();
  }, [selectedBranchId]);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await ReportsActions.getAllReports(selectedBranchId || undefined);
      setReports(data || []);
    } catch (error) {
      message.error('Failed to load reports');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async (values: any) => {
    try {
      const request: ReportGenerateRequest = {
        reportType: values.reportType,
        reportYear: values.reportYear,
        branchId: values.branchId,
        fileFormat: values.fileFormat,
        parameters: {
          startMonth: values.startMonth,
          endMonth: values.endMonth,
          includeCharts: values.includeCharts,
          includeRawData: values.includeRawData,
        },
      };
      const response = await ReportsActions.generateReport(request);
      message.success('Report generated successfully. Downloading...');
      setGenerateModalOpen(false);
      form.resetFields();

      // Auto-download the generated report
      if (response?.id) {
        await handleDownloadReportById(response.id, values.reportType, values.reportYear, values.fileFormat);
      }

      // Reload reports to show new report in list
      loadReports();
    } catch (error) {
      message.error('Failed to generate report');
      console.error(error);
    }
  };

  const handleDownloadReportById = async (reportId: number, reportType: string, reportYear: number, fileFormat: string) => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
      const token = localStorage.getItem('accessToken');

      // Fetch the file with authentication using the new download endpoint
      const response = await fetch(`${API_BASE_URL}/reports/${reportId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to download report');
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create filename
      const filename = `${reportType}_${reportYear}.${fileFormat.toLowerCase()}`;

      // Create download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      message.success(`Downloaded ${reportType} - ${reportYear}`);
    } catch (error) {
      console.error('Download error:', error);
      message.error('Failed to download report');
    }
  };

  const handleDeleteReport = async (reportId: number) => {
    try {
      await ReportsActions.deleteReport(reportId);
      message.success('Report deleted successfully');
      loadReports();
    } catch (error) {
      message.error('Failed to delete report');
      console.error(error);
    }
  };

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'PENDING': 'default',
      'GENERATING': 'processing',
      'COMPLETED': 'success',
      'FAILED': 'error',
    };
    return statusColors[status] || 'default';
  };

  const getFileIcon = (format: string) => {
    if (format === 'PDF') return <FilePdfOutlined style={{ color: '#f5222d' }} />;
    if (format === 'EXCEL') return <FileExcelOutlined style={{ color: '#52c41a' }} />;
    return <FileOutlined />;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '-';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const formatReportType = (type: string) => {
    return type.replace(/_/g, ' ');
  };

  const columns: ColumnsType<ReportData> = [
    {
      title: 'Report',
      key: 'report',
      render: (_, record) => (
        <Space>
          {getFileIcon(record.fileFormat)}
          <div>
            <div style={{ fontWeight: 600 }}>{formatReportType(record.reportType)}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {record.reportYear} {record.branchName && `• ${record.branchName}`}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Format',
      dataIndex: 'fileFormat',
      key: 'fileFormat',
      render: (format: string) => <Tag>{format}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'fileSizeBytes',
      key: 'fileSizeBytes',
      render: formatFileSize,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Completed',
      dataIndex: 'completedAt',
      key: 'completedAt',
      render: (date?: string) => date ? new Date(date).toLocaleString() : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === 'COMPLETED' && (
            <Tooltip title="Download Report">
              <Button
                type="link"
                icon={<DownloadOutlined />}
                onClick={() => handleDownloadReportById(record.id, record.reportType, record.reportYear, record.fileFormat)}
              >
                Download
              </Button>
            </Tooltip>
          )}
          {canManageConfiguration() && (
            <Tooltip title="Delete Report">
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteReport(record.id)}
              >
                Delete
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  // Generate current year and past 5 years
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => ({
    label: String(currentYear - i),
    value: currentYear - i,
  }));

  const monthOptions = [
    { label: 'January', value: 'JANUARY' },
    { label: 'February', value: 'FEBRUARY' },
    { label: 'March', value: 'MARCH' },
    { label: 'April', value: 'APRIL' },
    { label: 'May', value: 'MAY' },
    { label: 'June', value: 'JUNE' },
    { label: 'July', value: 'JULY' },
    { label: 'August', value: 'AUGUST' },
    { label: 'September', value: 'SEPTEMBER' },
    { label: 'October', value: 'OCTOBER' },
    { label: 'November', value: 'NOVEMBER' },
    { label: 'December', value: 'DECEMBER' },
  ];

  if (authLoading) {
    return (
      <DashboardLayout>
        <div style={{ padding: "24px", textAlign: "center" }}>
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>
              Reports & Analytics
            </h1>
            <p style={{ fontSize: "16px", color: "#666" }}>
              Generate and download emission reports
            </p>
          </div>
          {!authLoading && hasAnyRole(['ROLE_COMPANY_ADMIN', 'ROLE_BRANCH_ADMIN']) && (
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              onClick={() => setGenerateModalOpen(true)}
              size="large"
            >
              Generate Report
            </Button>
          )}
        </div>

        {/* Reports Table */}
        <Table
          columns={columns}
          dataSource={reports}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        {/* Generate Report Modal */}
        <Modal
          title="Generate New Report"
          open={generateModalOpen}
          onCancel={() => {
            setGenerateModalOpen(false);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleGenerateReport}>
            <Form.Item
              name="reportType"
              label="Report Type"
              rules={[{ required: true, message: 'Please select a report type' }]}
            >
              <Select options={REPORT_TYPES} placeholder="Select report type" />
            </Form.Item>

            <Form.Item
              name="reportYear"
              label="Report Year"
              rules={[{ required: true, message: 'Please select a year' }]}
            >
              <Select options={yearOptions} placeholder="Select year" />
            </Form.Item>

            <Form.Item name="branchId" label="Branch">
              <Select
                options={[
                  { label: 'All Branches', value: undefined },
                  ...branches.map(b => ({ label: b.name, value: b.id }))
                ]}
                placeholder="Select branch (optional for company-wide reports)"
              />
            </Form.Item>

            <Form.Item
              name="fileFormat"
              label="File Format"
              rules={[{ required: true, message: 'Please select a format' }]}
            >
              <Select options={FILE_FORMATS} placeholder="Select format" />
            </Form.Item>

            <Form.Item name="startMonth" label="Start Month (Optional)">
              <Select options={monthOptions} placeholder="Select start month" />
            </Form.Item>

            <Form.Item name="endMonth" label="End Month (Optional)">
              <Select options={monthOptions} placeholder="Select end month" />
            </Form.Item>

            <Form.Item name="includeCharts" label="Include Charts" valuePropName="checked">
              <Select>
                <Select.Option value={true}>Yes</Select.Option>
                <Select.Option value={false}>No</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="includeRawData" label="Include Raw Data" valuePropName="checked">
              <Select>
                <Select.Option value={true}>Yes</Select.Option>
                <Select.Option value={false}>No</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space style={{ float: 'right' }}>
                <Button onClick={() => { setGenerateModalOpen(false); form.resetFields(); }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Generate Report
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
