"use client";

import CompanyActions from "@/service/company-profile/actions";
import EmissionCollectionActions, {
  ActivityEntryData,
  CombustionEntry,
  SpendEntryData,
} from "@/service/emissions/actions";
import { Tabs } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ActivityDataSection from "../activity-data-section";
import { AddEntryBtn, AddEntrySection } from "../activity-data-section/styles";
import DataAvailabilitySection from "../data-availability-section";
import EmissionsDataSection, {
  EmissionsEntryData,
} from "../emissions-data-section";
import FormActions from "../form-actions";
import SpendDataSection from "../spend-data-section";
import {
  Button,
  Card,
  FacilityHeader,
  FacilityInfo,
  FormGroup,
  FormLabel,
  FormTextarea,
  ReasoningSection,
  SaveNaSection,
  StatusBadge,
} from "./styles";

const FacilityCard = () => {
  const [availability, setAvailability] = useState<
    "yes" | "not_available" | "not_applicable"
  >("yes");
  // Each entry: { type: "activity" | "spend" | "emissions", data: ActivityEntryData | SpendEntryData | EmissionsEntryData }
  const [entries, setEntries] = useState<CombustionEntry[]>([]);
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const [entriesData, companyData] = await Promise.all([
        EmissionCollectionActions.getCombustionEntries(),
        CompanyActions.fetchCompanyProfileWithDetails(),
      ]);
      setEntries(entriesData);
      setCompanyProfile(companyData);
    };
    fetchData();
  }, []);

  const handleBackToOverview = async () => {
    await EmissionCollectionActions.postCombustionEntry(entries);
    router.push("/data-collection");
  };

  const handleAddEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        type: "activity",
        data: {
          id: Date.now(),
          fuelType: "",
          amount: "",
          unit: "",
          equipment: "",
          notes: "",
        },
      },
    ]);
  };

  const handleRemoveEntry = (idx: number) => {
    setEntries((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev,
    );
  };

  const handleTypeChange = (
    idx: number,
    type: "activity" | "spend" | "emissions",
  ) => {
    setEntries((prev) =>
      prev.map((entry, i) => (i === idx ? { ...entry, type } : entry)),
    );
  };

  const handleDataChange = (idx: number, field: string, value: any) => {
    setEntries((prev) =>
      prev.map((entry, i) =>
        i === idx
          ? { ...entry, data: { ...entry.data, [field]: value } }
          : entry,
      ),
    );
  };

  return (
    <Card>
      <FacilityHeader>
        <FacilityInfo>
          <h4>🏢 {companyProfile?.name || "Company Name"}</h4>
          <p>
            {companyProfile?.type || "Type"} • {companyProfile?.size || "Size"}{" "}
            • {companyProfile?.employees || "Employees"}
          </p>
        </FacilityInfo>
        <StatusBadge>{companyProfile?.status || "ACTIVE"}</StatusBadge>
      </FacilityHeader>

      <DataAvailabilitySection
        availability={availability}
        onAvailabilityChange={setAvailability}
      />

      {availability === "yes" && (
        <>
          {entries.map((entry, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 32,
                border: "1px solid #eee",
                borderRadius: 8,
                padding: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5 style={{ margin: 0 }}>Entry {idx + 1}</h5>
                <button
                  onClick={() => handleRemoveEntry(idx)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#f00",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
              <Tabs
                activeKey={entry.type}
                onChange={(key) => handleTypeChange(idx, key as any)}
                items={[
                  {
                    key: "activity",
                    label: "Activity Data",
                    children: (
                      <ActivityDataSection
                        data={entry.data as ActivityEntryData}
                        onUpdateEntry={(_, field, value) =>
                          handleDataChange(idx, field, value)
                        }
                      />
                    ),
                  },
                  {
                    key: "spend",
                    label: "Spend Data",
                    children: (
                      <SpendDataSection
                        data={entry.data as SpendEntryData}
                        onUpdateEntry={(_, field, value) =>
                          handleDataChange(idx, field, value)
                        }
                      />
                    ),
                  },
                  {
                    key: "emissions",
                    label: "Emissions Data",
                    children: (
                      <EmissionsDataSection
                        data={entry.data as EmissionsEntryData}
                        onUpdateEntry={(_, field, value) =>
                          handleDataChange(idx, field, value)
                        }
                      />
                    ),
                  },
                ]}
              />
            </div>
          ))}
          <div className={AddEntrySection}>
            <button onClick={handleAddEntry} className={AddEntryBtn}>
              <span>+</span> Add Another Entry
            </button>
          </div>
          <FormActions onBackToOverview={handleBackToOverview} />
        </>
      )}
      <ReasoningSection show={availability === "not_available"}>
        <FormGroup>
          <FormLabel>
            Please provide a reason why this data is not available
          </FormLabel>
          <FormTextarea
            rows={4}
            placeholder="Explain why stationary combustion data is not available for this facility..."
          />
        </FormGroup>
      </ReasoningSection>
      <SaveNaSection show={availability === "not_applicable"}>
        <Button variant="primary">Save - Not Applicable</Button>
      </SaveNaSection>
    </Card>
  );
};

export default FacilityCard;

