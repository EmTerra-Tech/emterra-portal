"use client";

import { FormGroup, FormLabel, RadioGroup, RadioOption } from "./styles";

interface DataAvailabilitySectionProps {
  availability: "yes" | "not_available" | "not_applicable";
  onAvailabilityChange: (
    value: "yes" | "not_available" | "not_applicable",
  ) => void;
}

const DataAvailabilitySection = ({
  availability,
  onAvailabilityChange,
}: DataAvailabilitySectionProps) => {
  return (
    <FormGroup>
      <FormLabel>
        Do you have stationary combustion data for this facility?
      </FormLabel>
      <RadioGroup>
        <RadioOption>
          <input
            type="radio"
            name="availability"
            value="yes"
            id="availability_yes"
            checked={availability === "yes"}
            onChange={() => onAvailabilityChange("yes")}
          />
          <label htmlFor="availability_yes">Yes, I have the data</label>
        </RadioOption>
        <RadioOption>
          <input
            type="radio"
            name="availability"
            value="not_available"
            id="availability_not_available"
            checked={availability === "not_available"}
            onChange={() => onAvailabilityChange("not_available")}
          />
          <label htmlFor="availability_not_available">Data not available</label>
        </RadioOption>
        <RadioOption>
          <input
            type="radio"
            name="availability"
            value="not_applicable"
            id="availability_not_applicable"
            checked={availability === "not_applicable"}
            onChange={() => onAvailabilityChange("not_applicable")}
          />
          <label htmlFor="availability_not_applicable">Not Collected</label>
        </RadioOption>
      </RadioGroup>
    </FormGroup>
  );
};

export default DataAvailabilitySection;

