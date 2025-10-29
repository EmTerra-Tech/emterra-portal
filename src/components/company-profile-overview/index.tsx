"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, Button, Select, Table, Tag, Row, Col, Typography, Space, Statistic, Descriptions } from "antd"
import { Container, HeaderCard, StatsCard, FacilityCard, MetricChange } from "./styles"

const { Title, Text } = Typography
const { Option } = Select

const CompanyProfileOverview = () => {
  const [selectedYear, setSelectedYear] = useState("2024")
  const router = useRouter()

  const handleAddFacility = () => {
    router.push("/company-profile/add-facility")
  }

  const annualDataColumns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
      align: "right" as const,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      align: "right" as const,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (status: string) => (
        <Tag color={status === "progress" ? "orange" : "green"}>
          {status === "progress" ? "In Progress" : "Complete"}
        </Tag>
      ),
    },
  ]

  const annualData = [
    {
      key: "1",
      year: "2024",
      employees: "2,450",
      revenue: "$180M",
      status: "progress",
    },
    {
      key: "2",
      year: "2023",
      employees: "2,268",
      revenue: "$161M",
      status: "complete",
    },
    {
      key: "3",
      year: "2022",
      employees: "2,100",
      revenue: "$145M",
      status: "complete",
    },
  ]

  const facilities = [
    {
      name: "Seattle HQ",
      type: "Headquarters & Manufacturing",
      location: "Seattle, WA",
      size: "45,000 sq ft",
      employees: "850 employees",
      status: "active",
    },
    {
      name: "Austin Plant",
      type: "Manufacturing Facility",
      location: "Austin, TX",
      size: "78,000 sq ft",
      employees: "1,200 employees",
      status: "active",
    },
    {
      name: "Phoenix R&D",
      type: "Research & Development",
      location: "Phoenix, AZ",
      size: "25,000 sq ft",
      employees: "400 employees",
      status: "active",
    },
  ]

  return (
    <Container>
      <HeaderCard>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, marginBottom: 8 }}>
              Company Profile
            </Title>
            <Text type="secondary">Manage your organization information and annual data</Text>
          </Col>
          <Col>
            <Space>
              <Space align="center">
                <Text type="secondary">Current Year:</Text>
                <Select value={selectedYear} onChange={setSelectedYear} style={{ width: 100 }}>
                  <Option value="2024">2024</Option>
                  <Option value="2023">2023</Option>
                  <Option value="2022">2022</Option>
                </Select>
              </Space>
              <Button type="primary">Edit Profile</Button>
            </Space>
          </Col>
        </Row>
      </HeaderCard>

      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={16}>
          <Card
            title={
              <Space>
                <span>🏢</span>
                <span>Company Information</span>
              </Space>
            }
          >
            <Descriptions column={2} bordered={false}>
              <Descriptions.Item label="Company Name">
                <Text strong>GreenTech Industries Ltd.</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Industry">
                <Text strong>Manufacturing</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Founded">
                <Text strong>1998</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Headquarters">
                <Text strong>Seattle, WA, USA</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                <Text type="secondary">
                  Leading manufacturer of sustainable technology solutions, specializing in renewable energy components
                  and green building materials.
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={8}>
          <StatsCard
            title={
              <Space>
                <span>📊</span>
                <span>2024 Metrics</span>
              </Space>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Statistic title="Employees" value="2,450" />
                <MetricChange positive>
                  <span>↗</span>
                  <span>+8% vs 2023 (2,268)</span>
                </MetricChange>
              </div>

              <div>
                <Statistic title="Revenue" value="$180M" />
                <MetricChange positive>
                  <span>↗</span>
                  <span>+12% vs 2023 ($161M)</span>
                </MetricChange>
              </div>

              <div>
                <Statistic title="Facilities" value="8" />
                <MetricChange>
                  <span>→</span>
                  <span>No change vs 2023</span>
                </MetricChange>
              </div>

              <Button type="default" block style={{ marginTop: 16 }}>
                📈 Update 2024 Data
              </Button>
            </Space>
          </StatsCard>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <span>📅</span>
            <span>Annual Data Timeline</span>
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        <Table columns={annualDataColumns} dataSource={annualData} pagination={false} size="middle" />
      </Card>

      <Card
        title={
          <Space>
            <span>🏭</span>
            <span>Facilities Overview</span>
          </Space>
        }
        extra={
          <Button type="default" onClick={handleAddFacility}>
            <span>➕ Add Facility</span>
          </Button>
        }
      >
        <Row gutter={[16, 16]}>
          {facilities.map((facility, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <FacilityCard size="small">
                <Row justify="space-between" align="top" style={{ marginBottom: 8 }}>
                  <Col>
                    <Text strong>{facility.name}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {facility.type}
                    </Text>
                  </Col>
                  <Col>
                    <Tag color="green">ACTIVE</Tag>
                  </Col>
                </Row>
                <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
                  📍 {facility.location} • {facility.size}
                </Text>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {facility.employees}
                    </Text>
                  </Col>
                  <Col>
                    <Button size="small" type="link">
                      Edit
                    </Button>
                  </Col>
                </Row>
              </FacilityCard>
            </Col>
          ))}
        </Row>
      </Card>
    </Container>
  )
}

export default CompanyProfileOverview
