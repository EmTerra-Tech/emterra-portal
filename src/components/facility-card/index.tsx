"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ActivityDataSection from "../activity-data-section";
import DataAvailabilitySection from "../data-availability-section";
import DataTypeToggle from "../data-type-toggle";
import EmissionsDataSection from "../emissions-data-section";
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
  const [dataType, setDataType] = useState<"activity" | "spend" | "emissions">(
    "activity",
  );
  const router = useRouter();

  const handleBackToOverview = () => {
    router.push("/data-collection");
  };

  return (
    <Card>
      <FacilityHeader>
        <FacilityInfo>
          <h4>🏢 Seattle HQ</h4>
          <p>Headquarters & Manufacturing • 45,000 sq ft • 850 employees</p>
        </FacilityInfo>
        <StatusBadge>ACTIVE</StatusBadge>
      </FacilityHeader>

      <DataAvailabilitySection
        availability={availability}
        onAvailabilityChange={setAvailability}
      />

      {availability === "yes" && (
        <>
          <DataTypeToggle dataType={dataType} onDataTypeChange={setDataType} />
          {dataType === "activity" && <ActivityDataSection />}

          {dataType == "spend" && <SpendDataSection />}

          {dataType === "emissions" && <EmissionsDataSection />}
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

