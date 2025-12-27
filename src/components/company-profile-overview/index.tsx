"use client";

import CompanyActions from "@/service/company-profile/actions";
import {
  AnnualData,
  CompanyProfile,
  Facility,
} from "@/service/company-profile/types";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, FacilityCard, HeaderCard } from "./styles";

const { Title, Text } = Typography;
const { Option } = Select;

const CompanyProfileOverview = () => {
  const [data, setData] = useState<{
    companyProfile: CompanyProfile;
    annualData: AnnualData[];
    facilities: Facility[];
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await CompanyActions.fetchCompanyProfileWithDetails();
      setData(response);
    };

    fetchData();
  }, []);

  const handleAddFacility = () => {
    router.push("/company-profile/add-facility");
  };

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
  ];

  return (
    <Container>
      <HeaderCard>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, marginBottom: 8 }}>
              Company Profile
            </Title>
            <Text type="secondary">
              Manage your organization information and annual data
            </Text>
          </Col>
          <Col>
            <Space>
              <Button type="primary">Edit Profile</Button>
            </Space>
          </Col>
        </Row>
      </HeaderCard>

      {data && (
        <>
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
                    <Text strong>{data.companyProfile.companyName}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Industry">
                    <Text strong>{data.companyProfile.industry}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Founded">
                    <Text strong>{data.companyProfile.foundedYear}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Headquarters">
                    <Text strong>{data.companyProfile.headquarters}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Description" span={2}>
                    <Text type="secondary">
                      {data.companyProfile.description}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
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
            <Table
              columns={annualDataColumns}
              dataSource={data.annualData}
              pagination={false}
              size="middle"
            />
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
              {data.facilities.map((facility, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <FacilityCard size="small">
                    <Row
                      justify="space-between"
                      align="top"
                      style={{ marginBottom: 8 }}
                    >
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
                    <Text
                      type="secondary"
                      style={{
                        fontSize: 12,
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
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
        </>
      )}
    </Container>
  );
};

export default CompanyProfileOverview;

