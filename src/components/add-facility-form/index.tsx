"use client";

import CompanyActions from "@/service/company-profile/actions";
import { Facility } from "@/service/company-profile/types";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, FacilityCard, FormCard, HeaderCard } from "./styles";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AddFacilityForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [yearStatus, setYearStatus] = useState({
    2024: true,
    2023: true,
    2022: false,
  });
  const [existingFacilities, setExistingFacilities] = useState<Facility[]>([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      const response = await CompanyActions.fetchCompanyProfileWithDetails();
      setExistingFacilities(response.facilities);
    };

    fetchFacilities();
  }, []);

  // const handleToggleYear = (year: number, checked: boolean) => {
  //   setYearStatus((prev) => ({ ...prev, [year]: checked }));
  // };

  const handleSubmit = async (values: any) => {
    try {
      const facilityData = {
        name: values.name,
        address: values.address,
        city: values.city,
        country: values.country,
        phone: values.phone || "",
        zipcode: values.zipCode,
        description: values.description || "",
        type: values.facilityType,
        officeSpace: Number(values.officeSpace),
        spaceType: values.spaceUnit,
        empCount: Number(values.fteCount),
      };

      console.log("Submitting facility data:", facilityData);

      await CompanyActions.addFacility(facilityData);
      message.success("Facility added successfully!");
      router.push("/company-profile");
    } catch (error) {
      console.error("Error submitting facility:", error);
      message.error("Failed to add facility. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/company-profile");
  };

  const facilityTypes = [
    { value: "HEADQUARTERS", label: "Headquarters" },
    { value: "MANUFACTURING", label: "Manufacturing Plant" },
    { value: "WAREHOUSE", label: "Warehouse" },
    { value: "OFFICE", label: "Office Building" },
    { value: "RD", label: "Research & Development" },
    { value: "RETAIL", label: "Retail Location" },
    { value: "DATACENTER", label: "Data Center" },
    { value: "OTHER", label: "Other" },
  ];

  return (
    <div className={Container}>
      <Card className={HeaderCard}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, marginBottom: 8 }}>
              <Space>
                <span>🏭</span>
                <span>Add New Facility</span>
              </Space>
            </Title>
            <Text type="secondary">
              Enter facility information and operational details
            </Text>
          </Col>
          <Col>
            <Button onClick={handleCancel}>Cancel</Button>
          </Col>
        </Row>
      </Card>

      <Card className={FormCard}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
        >
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
              rules={[
                { required: true, message: "Please enter facility name" },
              ]}
            >
              <Input placeholder="e.g., Austin Manufacturing Plant" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input placeholder="Enter full street address" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true, message: "Please enter city" }]}
                >
                  <Input placeholder="e.g., Austin" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[{ required: true, message: "Please enter country" }]}
                >
                  <Input placeholder="e.g., USA" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Zip Code"
                  name="zipCode"
                  rules={[{ required: true, message: "Please enter zip code" }]}
                >
                  <Input placeholder="e.g., 78704" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      pattern: /^[+]?[0-9\-\(\)\s]{7,20}$/,
                      message: "Phone number format is invalid",
                    },
                  ]}
                >
                  <Input placeholder="e.g., +1-234-567-8900" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Office Space" required>
                  <Input.Group compact>
                    <Form.Item
                      name="officeSpace"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please enter office space",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="e.g., 45000"
                        style={{ width: "70%" }}
                        min={1}
                      />
                    </Form.Item>
                    <Form.Item name="spaceUnit" noStyle initialValue="SQFT">
                      <Select style={{ width: "30%" }}>
                        <Option value="SQFT">sq.ft</Option>
                        <Option value="SQM">sq.metre</Option>
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
                  rules={[
                    { required: true, message: "Please select facility type" },
                  ]}
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
                  rules={[
                    { required: true, message: "Please enter FTE count" },
                  ]}
                  help="Full-time equivalent employees"
                >
                  <InputNumber placeholder="e.g., 850" style={{ width: "100%" }} min={1} />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Operational Status Section */}
          {/* <div style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 20 }}>
              <Space>
                <span>⚙️</span>
                <span>Operational Status</span>
              </Space>
            </Title>

            <Card className={StatusCard}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>Reporting Year Status</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Configure facility status for each reporting year
                </Text>
              </div>

              <div className={StatusItem}>
                <div>
                  <Text strong>2024 Status</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Current reporting year
                  </Text>
                </div>
                <Space align="center">
                  <Text type="secondary">Inactive</Text>
                  <Switch
                    checked={yearStatus[2024]}
                    onChange={(checked) => handleToggleYear(2024, checked)}
                  />
                  <Text
                    style={{
                      color: yearStatus[2024] ? "#52c41a" : "#8c8c8c",
                      fontWeight: 600,
                    }}
                  >
                    Active
                  </Text>
                </Space>
              </div>

              <div className={StatusItem}>
                <div>
                  <Text strong>2023 Status</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Previous reporting year
                  </Text>
                </div>
                <Space align="center">
                  <Text type="secondary">Inactive</Text>
                  <Switch
                    checked={yearStatus[2023]}
                    onChange={(checked) => handleToggleYear(2023, checked)}
                  />
                  <Text
                    style={{
                      color: yearStatus[2023] ? "#52c41a" : "#8c8c8c",
                      fontWeight: 600,
                    }}
                  >
                    Active
                  </Text>
                </Space>
              </div>

              <div className={StatusItem}>
                <div>
                  <Text strong>2022 Status</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Historical reporting year
                  </Text>
                </div>
                <Space align="center">
                  <Text
                    style={{
                      color: yearStatus[2022] ? "#8c8c8c" : "#ff4d4f",
                      fontWeight: 600,
                    }}
                  >
                    Inactive
                  </Text>
                  <Switch
                    checked={yearStatus[2022]}
                    onChange={(checked) => handleToggleYear(2022, checked)}
                  />
                  <Text type="secondary">Active</Text>
                </Space>
              </div>

              <Alert
                message="Status Impact"
                description="Facility status affects carbon calculations for each reporting year. Inactive facilities are excluded from calculations."
                type="warning"
                showIcon
                style={{ marginTop: 16 }}
              />
            </Card>
          </div> */}

          {/* Additional Information Section */}
          <div style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 20 }}>
              <Space>
                <span>📄</span>
                <span>Additional Information</span>
              </Space>
            </Title>

            <Form.Item label="Description (Optional)" name="description">
              <TextArea
                rows={3}
                placeholder="Brief description of facility operations, special considerations, etc."
              />
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
                  rules={[
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input placeholder="facility.manager@company.com" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Form Actions */}
          <div
            style={{
              textAlign: "center",
              paddingTop: 24,
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Button type="primary" htmlType="submit" size="large">
              💾 Save Facility
            </Button>
          </div>
        </Form>
      </Card>

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
              <Card className={FacilityCard} size="small">
                <Row
                  justify="space-between"
                  align="top"
                  style={{ marginBottom: 8 }}
                >
                  <Col>
                    <Text strong>{facility.name}</Text>
                  </Col>
                  <Col>
                    <Tag color="green">ACTIVE</Tag>
                  </Col>
                </Row>
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block", marginBottom: 4 }}
                >
                  📍 {facility.location}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {facility.size} • {facility.employees}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default AddFacilityForm;

