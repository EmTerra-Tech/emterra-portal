"use client";

import CompanyActions from "@/service/company-profile/actions";
import {
  AnnualData,
  CompanyProfile,
  Facility,
} from "@/service/company-profile/types";
import {
  BankOutlined,
  CalendarOutlined,
  EditOutlined,
  LockOutlined,
  PlusOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Select, Table, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ActionButton,
  AddFacilityCard,
  CardHeader,
  Container,
  FacilitiesGrid,
  FacilityItem,
  IconBox,
  InfoGrid,
  InfoItem,
  PageHeader,
  PrimaryButton,
  StyledCard,
  StyledModal,
  Tag,
} from "./styles";

const CompanyProfileOverview = () => {
  const [data, setData] = useState<{
    companyProfile: CompanyProfile;
    annualData: AnnualData[];
    facilities: Facility[];
  } | null>(null);
  
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);
  const [selectedFacilityYear, setSelectedFacilityYear] = useState<string>("2024");
  
  const [assessmentForm, setAssessmentForm] = useState({
    year: "2024",
    revenue: "",
    currency: "USD",
    fte: "",
  });

  const [facilityForm, setFacilityForm] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    country: "",
    zipcode: "",
    phone: "",
    size: "",
    sizeUnit: "SQFT",
    employees: "",
    status: "ACTIVE",
  });

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await CompanyActions.fetchCompanyProfileWithDetails();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFacility = () => {
    setIsFacilityModalOpen(true);
  };

  const handleSaveAssessment = () => {
    console.log("Saving assessment data:", assessmentForm);
    setIsAssessmentModalOpen(false);
    // Reset form or handle success
  };

  const handleSaveFacility = async () => {
    try {
      const payload = {
        name: facilityForm.name,
        address: facilityForm.address,
        city: facilityForm.city,
        country: facilityForm.country,
        zipcode: facilityForm.zipcode,
        description: "",
        type: facilityForm.type,
        officeSpace: Number(facilityForm.size) || 0,
        spaceType: facilityForm.sizeUnit,
        empCount: Number(facilityForm.employees) || 0,
        phone: facilityForm.phone
      };

      await CompanyActions.addFacility(payload);
      
      message.success("Facility added successfully");
      setIsFacilityModalOpen(false);
      
      // Reset form
      setFacilityForm({
        name: "",
        type: "",
        address: "",
        city: "",
        country: "",
        zipcode: "",
        phone: "",
        size: "",
        sizeUnit: "SQFT",
        employees: "",
        status: "ACTIVE",
      });

      // Refresh list
      fetchData();
    } catch (error) {
      console.error("Error adding facility:", error);
      message.error("Failed to add facility. Please try again.");
    }
  };

  // Filter facilities based on selected year
  // Note: Assuming 'data.facilities' contains all facilities. 
  // If the API doesn't return year-specific data, this is a client-side filter simulation.
  // Ideally, the API would support ?year=2024
  const filteredFacilities = data?.facilities || []; 

  const annualDataColumns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (text: string, record: AnnualData) => (
        <span style={{ fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
          {record.locked && <LockOutlined style={{ color: '#94a3b8', fontSize: 14 }} />}
          {text}
        </span>
      ),
    },
    {
      title: "Employees (FTE)",
      dataIndex: "employees",
      key: "employees",
      align: "center" as const,
      render: (text: number) => <span style={{ color: '#475569' }}>{text}</span>,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      align: "center" as const,
      render: (text: string) => <span style={{ fontWeight: 600, color: '#1e293b' }}>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (status: string) => (
        <span style={{
          padding: '6px 12px',
          background: status === "progress" ? '#fff7ed' : '#f0fdf4',
          color: status === "progress" ? '#c2410c' : '#15803d',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 500
        }}>
          {status === "progress" ? "In Progress" : "Completed"}
        </span>
      ),
    },
  ];

  if (!data) return null;

  return (
    <Container>
      <PageHeader>
        <h1>Company Profile</h1>
        <p>Manage your organization information and annual data</p>
      </PageHeader>

      <StyledCard>
        <CardHeader>
          <IconBox gradient="#1E6091" shadowColor="rgba(30, 96, 145, 0.3)">
            <BankOutlined />
          </IconBox>
          <h2>Company Information</h2>
          <ActionButton>
            <EditOutlined /> Edit Profile
          </ActionButton>
        </CardHeader>
        
        <InfoGrid>
          <InfoItem>
            <label>Company Name</label>
            <p>{data.companyProfile.companyName}</p>
          </InfoItem>
          
          <InfoItem>
            <label>Industry</label>
            <Tag type="success">{data.companyProfile.industry}</Tag>
          </InfoItem>
          
          <InfoItem>
            <label>Founded</label>
            <p>{data.companyProfile.foundedYear}</p>
          </InfoItem>
          
          <InfoItem>
            <label>Headquarters</label>
            <p>{data.companyProfile.headquarters}</p>
          </InfoItem>
          
          <InfoItem span={4}>
            <label>Description</label>
            <p className="description">{data.companyProfile.description}</p>
          </InfoItem>
        </InfoGrid>
      </StyledCard>

      <StyledCard>
        <CardHeader>
          <IconBox gradient="#1E6091" shadowColor="rgba(30, 96, 145, 0.3)">
            <CalendarOutlined />
          </IconBox>
          <h2>Annual Data Timeline</h2>
          <PrimaryButton onClick={() => setIsAssessmentModalOpen(true)}>
             <PlusOutlined /> Add Assessment
          </PrimaryButton>
        </CardHeader>
        
        <Table
          columns={annualDataColumns}
          dataSource={data.annualData}
          pagination={false}
          rowClassName="ant-table-row"
        />
      </StyledCard>

      <StyledCard>
        <CardHeader>
          <IconBox gradient="#1E6091" shadowColor="rgba(30, 96, 145, 0.3)">
            <BankOutlined /> {/* Using Bank as generic building icon if Building2 not avail */}
          </IconBox>
          <h2>Facilities Overview</h2>
          
          <div style={{ marginLeft: 'auto' }}>
            <Select 
              value={selectedFacilityYear}
              onChange={(value) => setSelectedFacilityYear(value)}
              style={{ width: 120 }}
              options={[
                { value: '2024', label: '2024' },
                { value: '2023', label: '2023' },
                { value: '2022', label: '2022' },
              ]}
            />
          </div>
        </CardHeader>

        <FacilitiesGrid>
          <AddFacilityCard onClick={handleAddFacility}>
            <div className="icon-wrapper">
              <PlusOutlined />
            </div>
            <h3>Add Facility</h3>
            <p>Click to add a new facility</p>
          </AddFacilityCard>

          {filteredFacilities.map((facility, index) => (
            <FacilityItem key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <h3>{facility.name}</h3>
                <Tag type="success">ACTIVE</Tag>
              </div>
              <p className="type">{facility.type}</p>
              <div className="location">
                <span style={{ color: '#f472b6' }}>📍</span>
                {facility.location} • {facility.size}
              </div>
              <div className="footer">
                <span style={{ fontSize: 14, color: '#475569' }}>
                  {facility.employees.toLocaleString()} employees
                </span>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#3b82f6', 
                  fontWeight: 600, 
                  cursor: 'pointer' 
                }}>
                  Edit
                </button>
              </div>
            </FacilityItem>
          ))}
        </FacilitiesGrid>
      </StyledCard>

      <StyledModal
        title="Add Assessment"
        open={isAssessmentModalOpen}
        onCancel={() => setIsAssessmentModalOpen(false)}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <ActionButton onClick={() => setIsAssessmentModalOpen(false)}>Cancel</ActionButton>
            <PrimaryButton onClick={handleSaveAssessment}>Save Assessment</PrimaryButton>
          </div>
        }
        width={480}
      >
        <div style={{ marginBottom: 24 }}>
          <label>Assessment Year</label>
          <input 
            type="text" 
            value={assessmentForm.year}
            onChange={(e) => setAssessmentForm({...assessmentForm, year: e.target.value})}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label>Revenue</label>
          <div style={{ display: 'flex', gap: 12 }}>
            <select 
              style={{ width: 100 }}
              value={assessmentForm.currency}
              onChange={(e) => setAssessmentForm({...assessmentForm, currency: e.target.value})}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <input 
              type="text" 
              placeholder="Enter annual revenue"
              value={assessmentForm.revenue}
              onChange={(e) => setAssessmentForm({...assessmentForm, revenue: e.target.value})}
              style={{ flex: 1 }}
            />
          </div>
        </div>

        <div>
          <label>Full-Time Equivalent (FTE)</label>
          <div style={{ position: 'relative' }}>
             <TeamOutlined style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input 
              type="number"
              placeholder="Enter number of employees"
              value={assessmentForm.fte}
              onChange={(e) => setAssessmentForm({...assessmentForm, fte: e.target.value})}
              style={{ paddingLeft: 44 }}
            />
          </div>
        </div>
      </StyledModal>

      <StyledModal
        title="Add Facility"
        open={isFacilityModalOpen}
        onCancel={() => setIsFacilityModalOpen(false)}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <ActionButton onClick={() => setIsFacilityModalOpen(false)}>Cancel</ActionButton>
            <PrimaryButton onClick={handleSaveFacility}>Add Facility</PrimaryButton>
          </div>
        }
        width={520}
      >
        <div style={{ marginBottom: 20 }}>
          <label>Facility Name</label>
          <input
            type="text"
            placeholder="Enter facility name"
            value={facilityForm.name}
            onChange={(e) => setFacilityForm({...facilityForm, name: e.target.value})}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Facility Type</label>
          <select
            value={facilityForm.type}
            onChange={(e) => setFacilityForm({...facilityForm, type: e.target.value})}
          >
            <option value="">Select type</option>
            <option value="OFFICE">Office</option>
            <option value="MANUFACTURING">Manufacturing</option>
            <option value="WAREHOUSE">Warehouse</option>
            <option value="RETAIL">Retail</option>
            <option value="DATACENTER">Data Center</option>
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Address</label>
          <input
            type="text"
            placeholder="Street Address"
            value={facilityForm.address}
            onChange={(e) => setFacilityForm({...facilityForm, address: e.target.value})}
            style={{ marginBottom: 12 }}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="text"
              placeholder="City"
              value={facilityForm.city}
              onChange={(e) => setFacilityForm({...facilityForm, city: e.target.value})}
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Country"
              value={facilityForm.country}
              onChange={(e) => setFacilityForm({...facilityForm, country: e.target.value})}
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={facilityForm.zipcode}
              onChange={(e) => setFacilityForm({...facilityForm, zipcode: e.target.value})}
              style={{ width: 100 }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="e.g. +1 234 567 8900"
            value={facilityForm.phone}
            onChange={(e) => setFacilityForm({...facilityForm, phone: e.target.value})}
          />
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label>Size</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="number"
                placeholder="Area"
                value={facilityForm.size}
                onChange={(e) => setFacilityForm({...facilityForm, size: e.target.value})}
                style={{ flex: 1 }}
              />
              <select
                value={facilityForm.sizeUnit}
                onChange={(e) => setFacilityForm({...facilityForm, sizeUnit: e.target.value})}
                style={{ width: 100 }}
              >
                <option value="SQFT">SQFT</option>
                <option value="SQM">SQM</option>
              </select>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label>Employees</label>
            <input
              type="number"
              placeholder="Number of employees"
              value={facilityForm.employees}
              onChange={(e) => setFacilityForm({...facilityForm, employees: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label>Status</label>
          <div style={{ display: 'flex', gap: 12 }}>
            <label style={{
              flex: 1,
              padding: '14px 16px',
              border: facilityForm.status === 'ACTIVE' ? '2px solid #22c55e' : '2px solid #e2e8f0',
              borderRadius: '12px',
              background: facilityForm.status === 'ACTIVE' ? '#f0fdf4' : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <input 
                type="radio" 
                name="status" 
                value="ACTIVE" 
                checked={facilityForm.status === 'ACTIVE'}
                onChange={(e) => setFacilityForm({...facilityForm, status: e.target.value})}
                style={{ width: 'auto', margin: 0 }} 
              />
              <span style={{ fontWeight: 500, color: '#15803d' }}>Active</span>
            </label>
            <label style={{
              flex: 1,
              padding: '14px 16px',
              border: facilityForm.status === 'INACTIVE' ? '2px solid #64748b' : '2px solid #e2e8f0',
              borderRadius: '12px',
              background: facilityForm.status === 'INACTIVE' ? '#f8fafc' : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <input 
                type="radio" 
                name="status" 
                value="INACTIVE" 
                checked={facilityForm.status === 'INACTIVE'}
                onChange={(e) => setFacilityForm({...facilityForm, status: e.target.value})}
                style={{ width: 'auto', margin: 0 }} 
              />
              <span style={{ fontWeight: 500, color: '#64748b' }}>Inactive</span>
            </label>
          </div>
        </div>
      </StyledModal>
    </Container>
  );
};

export default CompanyProfileOverview;

