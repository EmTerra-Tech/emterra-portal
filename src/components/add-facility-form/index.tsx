"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, Form, Input, Select, Button, Switch, Row, Col, Typography, Space, Alert, Tag, message } from "antd"
import { Container, HeaderCard, FormCard, StatusCard, StatusItem, FacilityCard } from "./styles"

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select

const AddFacilityForm = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [yearStatus, setYearStatus] = useState({
    2024: true,
    2023: true,
    2022: false,
  })

  const handleToggleYear = (year: number, checked: boolean) => {
    setYearStatus((prev) => ({ ...prev, [year]: checked }))
  }

  const handleSubmit = (values: any) => {
    console.log("Form values:", values)
    console.log("Year status:", yearStatus)
    message.success("Facility information saved successfully!")
    router.push("/company-profile")
  }

  const handleCancel = () => {
    router.push("/company-profile")
  }

  const facilityTypes = [
    { value: "headquarters", label: "Headquarters" },
    { value: "manufacturing", label: "Manufacturing Plant" },
    { value: "warehouse", label: "Warehouse" },
    { value: "office", label: "Office Building" },
    { value: "rd", label: "Research & Development" },
    { value: "retail", label: "Retail Location" },
    { value: "datacenter", label: "Data Center" },
    { value: "other", label: "Other" },
  ]

  const existingFacilities = [
    {
      name: "Seattle HQ",
      location: "Seattle, WA",
      size: "45,000 sq ft",
      fte: "850 FTE",
    },
    {
      name: "Austin Plant",
      location: "Austin, TX",
      size: "78,000 sq ft",
      fte: "1,200 FTE",
    },
  ]

  return (
    <Container>
      <HeaderCard>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, marginBottom: 8 }}>
              <Space>
                <span>🏭</span>
                <span>Add New Facility</span>
              </Space>
            </Title>
            <Text type="secondary">Enter facility information and operational details</Text>
          </Col>
          <Col>
            <Button onClick={handleCancel}>Cancel</Button>
          </Col>
        </Row>
      </HeaderCard>

      <FormCard>
        <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark="optional">
          {/* Basic Information Section */}
          <div style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 20 }}>
              <Space>
                <span>📝</span>
                <span>Basic Information</span>
              </Space>
            </Title>

            <Form.Item
              label="Name of Facility"
              name="name"
              rules={[{ required: true, message: "Please enter facility name" }]}
            >
              <Input placeholder="e.g., Austin Manufacturing Plant" />
            </Form.Item>

            <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter address" }]}>
              <Input placeholder="Enter full street address" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Zip Code"
                  name="zipCode"
                  rules={[{ required: true, message: "Please enter zip code" }]}
                >
                  <Input placeholder="e.g., 78704" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Office Space" required>
                  <Input.Group compact>
                    <Form.Item
                      name="officeSpace"
                      noStyle
                      rules={[{ required: true, message: "Please enter office space" }]}
                    >
                      <Input placeholder="e.g., 45000" style={{ width: "70%" }} type="number" />
                    </Form.Item>
                    <Form.Item name="spaceUnit" noStyle initialValue="sqft">
                      <Select style={{ width: "30%" }}>
                        <Option value="sqft">sq.ft</Option>
                        <Option value="sqm">sq.metre</Option>
                      </Select>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Type of Facility"
                  name="facilityType"
                  rules={[{ required: true, message: "Please select facility type" }]}
                >
                  <Select placeholder="Select facility type">
                    {facilityTypes.map((type) => (
                      <Option key={type.value} value={type.value}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="FTE Count"
                  name="fteCount"
                  rules={[{ required: true, message: "Please enter FTE count" }]}
                  help="Full-time equivalent employees"
                >
                  <Input placeholder="e.g., 850" type="number" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Operational Status Section */}
          <div style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 20 }}>
              <Space>
                <span>⚙️</span>
                <span>Operational Status</span>
              </Space>
            </Title>

            <StatusCard>
              <div style={{ marginBottom: 16 }}>
                <Text strong>Reporting Year Status</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Configure facility status for each reporting year
                </Text>
              </div>

              <StatusItem>
                <div>
                  <Text strong>2024 Status</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Current reporting year
                  </Text>
                </div>
                <Space align="center">
                  <Text type="secondary">Inactive</Text>
                  <Switch checked={yearStatus[2024]} onChange={(checked) => handleToggleYear(2024, checked)} />
                  <Text style={{ color: yearStatus[2024] ? "#52c41a" : "#8c8c8c", fontWeight: 600 }}>Active</Text>
                </Space>
              </StatusItem>

              <StatusItem>
                <div>
                  <Text strong>2023 Status</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Previous reporting year
                  </Text>
                </div>
                <Space align="center">
                  <Text type="secondary">Inactive</Text>
                  <Switch checked={yearStatus[2023]} onChange={(checked) => handleToggleYear(2023, checked)} />
                  <Text style={{ color: yearStatus[2023] ? "#52c41a" : "#8c8c8c", fontWeight: 600 }}>Active</Text>
                </Space>
              </StatusItem>

              <StatusItem>
                <div>
                  <Text strong>2022 Status</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Historical reporting year
                  </Text>
                </div>
                <Space align="center">
                  <Text style={{ color: yearStatus[2022] ? "#8c8c8c" : "#ff4d4f", fontWeight: 600 }}>Inactive</Text>
                  <Switch checked={yearStatus[2022]} onChange={(checked) => handleToggleYear(2022, checked)} />
                  <Text type="secondary">Active</Text>
                </Space>
              </StatusItem>

              <Alert
                message="Status Impact"
                description="Facility status affects carbon calculations for each reporting year. Inactive facilities are excluded from calculations."
                type="warning"
                showIcon
                style={{ marginTop: 16 }}
              />
            </StatusCard>
          </div>

          {/* Additional Information Section */}
          <div style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 20 }}>
              <Space>
                <span>📄</span>
                <span>Additional Information</span>
              </Space>
            </Title>

            <Form.Item label="Description (Optional)" name="description">
              <TextArea rows={3} placeholder="Brief description of facility operations, special considerations, etc." />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Primary Contact" name="primaryContact">
                  <Input placeholder="Facility manager name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Contact Email"
                  name="contactEmail"
                  rules={[{ type: "email", message: "Please enter a valid email" }]}
                >
                  <Input placeholder="facility.manager@company.com" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Form Actions */}
          <div style={{ textAlign: "center", paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
            <Button type="primary" htmlType="submit" size="large">
              💾 Save Facility
            </Button>
          </div>
        </Form>
      </FormCard>

      {/* Existing Facilities Preview */}
      <Card
        title={
          <Space>
            <span>🏢</span>
            <span>Existing Facilities</span>
          </Space>
        }
      >
        <Row gutter={[16, 16]}>
          {existingFacilities.map((facility, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <FacilityCard size="small">
                <Row justify="space-between" align="top" style={{ marginBottom: 8 }}>
                  <Col>
                    <Text strong>{facility.name}</Text>
                  </Col>
                  <Col>
                    <Tag color="green">ACTIVE</Tag>
                  </Col>
                </Row>
                <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
                  📍 {facility.location}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {facility.size} • {facility.fte}
                </Text>
              </FacilityCard>
            </Col>
          ))}
        </Row>
      </Card>
    </Container>
  )
}

export default AddFacilityForm
