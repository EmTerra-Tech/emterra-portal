"use client";

import CompanyActions from "@/service/company-profile/actions";
import BranchActions from "@/service/branch/actions";
import EmissionCollectionActions from "@/service/emissions/actions";
import SchemaActions, { SchemaField } from "@/service/schema/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DynamicFormSection from "../dynamic-form-section";
import { AddEntryBtn, AddEntrySection } from "../activity-data-section/styles";
import DataAvailabilitySection from "../data-availability-section";
import FormActions from "../form-actions";
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

interface FacilityCardProps {
  scope: string;
}

// Add animation styles
const animationStyles = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FacilityCard = ({ scope }: FacilityCardProps) => {
  const [availability, setAvailability] = useState<
    "yes" | "not_available" | "not_applicable"
  >("yes");
  const [dataType, setDataType] = useState<"activity" | "spend" | "direct">("activity");
  const [entries, setEntries] = useState<any[]>([]);
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [schema, setSchema] = useState<SchemaField[]>([]);
  const [isLoadingSchema, setIsLoadingSchema] = useState(false);
  const [notAvailableReason, setNotAvailableReason] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const [entriesData, companyData, branchesData] = await Promise.all([
        EmissionCollectionActions.getCombustionEntries(scope),
        CompanyActions.fetchCompanyProfileWithDetails(),
        BranchActions.getAllBranches(),
      ]);
      // Start with only 1 entry by default
      // Extract only the 'data' field from fetched entries, add unique ID for React key
      if (entriesData.length > 0 && entriesData[0].data) {
        setEntries([{ ...entriesData[0].data, id: Date.now() }]);
      } else {
        setEntries([{ id: Date.now() }]);
      }
      setCompanyProfile(companyData.companyProfile);
      if (branchesData && branchesData.length > 0) {
        setBranches(branchesData);
        setSelectedBranchId(branchesData[0].id);
      }
    };
    fetchData();
  }, [scope]);

  useEffect(() => {
    const fetchSchema = async () => {
      setIsLoadingSchema(true);
      try {
        const availabilityMap = {
          yes: "YES",
          not_available: "NOT_AVAILABLE",
          not_applicable: "NOT_APPLICABLE",
        };
        console.log("Fetching schema for:", scope, availabilityMap[availability], dataType);

        // Only pass dataType when availability is "yes"
        const schemaData = await SchemaActions.getSchema(
          scope,
          availabilityMap[availability],
          availability === "yes" ? dataType : undefined
        );
        console.log("Schema data received:", schemaData);
        setSchema(schemaData);
      } catch (error) {
        console.error("Error fetching schema:", error);
      } finally {
        setIsLoadingSchema(false);
      }
    };
    fetchSchema();
  }, [scope, availability, dataType]);

  const handleSave = async (state: "DRAFT" | "SUBMITTED") => {
    try {
      // Prepare data based on availability
      let dataToSend: any[] = [];

      if (availability === "yes") {
        // Check if user has filled in any data
        const hasData = entries.some(entry => {
          const keys = Object.keys(entry).filter(k => k !== 'id');
          return keys.length > 0 && keys.some(k => entry[k] !== undefined && entry[k] !== '');
        });

        if (!hasData) {
          alert("Please fill in the form data before saving.");
          return false;
        }
        dataToSend = entries;
      } else if (availability === "not_available") {
        // For not_available, send reason field
        if (!notAvailableReason || notAvailableReason.trim() === "") {
          alert("Please provide a reason why data is not available.");
          return false;
        }
        dataToSend = [{ reason: notAvailableReason }];
      } else if (availability === "not_applicable") {
        // For not_applicable, send empty data
        dataToSend = [];
      }

      await EmissionCollectionActions.postCombustionEntry(
        dataToSend,
        scope,
        selectedYear,
        availability,
        state,
        selectedBranchId || undefined
      );
      return true;
    } catch (error) {
      console.error("Error saving data:", error);
      return false;
    }
  };

  const handleSaveDraft = async () => {
    const success = await handleSave("DRAFT");
    if (success) {
      alert("Draft saved successfully!");
    } else {
      alert("Failed to save draft");
    }
  };

  const handleSaveAndContinue = async () => {
    const success = await handleSave("SUBMITTED");
    if (success) {
      router.push("/data-collection");
    } else {
      alert("Failed to save data");
    }
  };

  const handleBackToOverview = () => {
    router.push("/data-collection");
  };

  const handleAvailabilityChange = (newAvailability: "yes" | "not_available" | "not_applicable") => {
    setAvailability(newAvailability);
    // Don't save immediately - let user fill in data/reason first
  };

  const handleAddEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        id: Date.now(),
      },
    ]);
  };

  const handleRemoveEntry = (idx: number) => {
    setEntries((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev,
    );
  };

  const handleDataChange = (idx: number, field: string, value: any) => {
    setEntries((prev) =>
      prev.map((entry, i) =>
        i === idx ? { ...entry, [field]: value } : entry
      )
    );
  };

  return (
    <>
      <style>{animationStyles}</style>
      <Card>
        <FacilityHeader>
        <FacilityInfo>
          <h4>🏢 {(selectedBranchId && branches.find(b => b.id === selectedBranchId)?.name) || companyProfile?.companyName || "Select Facility"}</h4>
          <p>
            {(selectedBranchId && branches.find(b => b.id === selectedBranchId)?.spaceType) || "Type"} •{" "}
            {(selectedBranchId && branches.find(b => b.id === selectedBranchId)?.officeSpace) || "0"} sqft •{" "}
            {(selectedBranchId && branches.find(b => b.id === selectedBranchId)?.empCount) || "0"} Employees
          </p>
        </FacilityInfo>
        <StatusBadge>ACTIVE</StatusBadge>
      </FacilityHeader>

      <DataAvailabilitySection
        availability={availability}
        onAvailabilityChange={handleAvailabilityChange}
      />

      {availability === "yes" && (
        <div style={{
          padding: "20px",
          marginBottom: "20px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          backgroundColor: "#f9fafb",
        }}>
          <FormLabel style={{ marginBottom: "12px", display: "block" }}>
            Calculation Method
          </FormLabel>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => setDataType("activity")}
              style={{
                padding: "10px 20px",
                border: dataType === "activity" ? "2px solid #2dd4bf" : "2px solid #e5e7eb",
                borderRadius: "8px",
                backgroundColor: dataType === "activity" ? "#ecfdf5" : "white",
                color: dataType === "activity" ? "#059669" : "#64748b",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              📊 Activity Data
            </button>
            <button
              onClick={() => setDataType("spend")}
              style={{
                padding: "10px 20px",
                border: dataType === "spend" ? "2px solid #2dd4bf" : "2px solid #e5e7eb",
                borderRadius: "8px",
                backgroundColor: dataType === "spend" ? "#ecfdf5" : "white",
                color: dataType === "spend" ? "#059669" : "#64748b",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              💰 Spend-Based
            </button>
            <button
              onClick={() => setDataType("direct")}
              style={{
                padding: "10px 20px",
                border: dataType === "direct" ? "2px solid #2dd4bf" : "2px solid #e5e7eb",
                borderRadius: "8px",
                backgroundColor: dataType === "direct" ? "#ecfdf5" : "white",
                color: dataType === "direct" ? "#059669" : "#64748b",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              🎯 Direct Emissions
            </button>
          </div>
          <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px", marginBottom: "0" }}>
            {dataType === "activity" && "Enter consumption amounts (e.g., kWh, liters) to calculate emissions"}
            {dataType === "spend" && "Enter spending amounts to estimate emissions based on economic data"}
            {dataType === "direct" && "Enter already calculated emissions values directly"}
          </p>
        </div>
      )}

      {availability === "yes" && (
        <>
          {isLoadingSchema ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
              Loading form fields...
            </div>
          ) : schema.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#ef4444" }}>
              No form schema available for this scope. Please check backend configuration.
            </div>
          ) : (
            <>
              {entries.map((entry, idx) => (
                <div
                  key={entry.id || idx}
                  style={{
                    marginBottom: 32,
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: 20,
                    backgroundColor: "white",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    animation: "slideIn 0.3s ease-out",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <h5 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>
                      Entry {idx + 1}
                    </h5>
                    {entries.length > 1 && (
                      <button
                        onClick={() => handleRemoveEntry(idx)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          background: "#fee2e2",
                          border: "none",
                          borderRadius: "8px",
                          color: "#dc2626",
                          fontSize: 20,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#fecaca";
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#fee2e2";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <DynamicFormSection
                    schema={schema}
                    data={entry}
                    onUpdateEntry={handleDataChange}
                    entryIndex={idx}
                  />
                </div>
              ))}
              <div className={AddEntrySection}>
                <button onClick={handleAddEntry} className={AddEntryBtn}>
                  <span>+</span> Add Another Entry
                </button>
              </div>
              <FormActions
                onBackToOverview={handleBackToOverview}
                onSaveDraft={handleSaveDraft}
                onSaveAndContinue={handleSaveAndContinue}
              />
            </>
          )}
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
            value={notAvailableReason}
            onChange={(e) => setNotAvailableReason(e.target.value)}
          />
        </FormGroup>
        <FormActions
          onBackToOverview={handleBackToOverview}
          onSaveDraft={handleSaveDraft}
          onSaveAndContinue={handleSaveAndContinue}
        />
      </ReasoningSection>
      <SaveNaSection show={availability === "not_applicable"}>
        <FormActions
          onBackToOverview={handleBackToOverview}
          onSaveDraft={handleSaveDraft}
          onSaveAndContinue={handleSaveAndContinue}
        />
      </SaveNaSection>
      </Card>
    </>
  );
};

export default FacilityCard;

