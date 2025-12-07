"use client";

import { ToggleContainer, ToggleOption, ToggleSwitch } from "./styles";

interface DataTypeToggleProps {
  dataType: "activity" | "spend" | "emissions";
  onDataTypeChange: (type: "activity" | "spend" | "emissions") => void;
}

const DataTypeToggle = ({
  dataType,
  onDataTypeChange,
}: DataTypeToggleProps) => {
  return (
    <ToggleContainer>
      <ToggleSwitch>
        <ToggleOption
          active={dataType === "activity"}
          onClick={() => onDataTypeChange("activity")}
        >
          Activity Data
        </ToggleOption>
        <ToggleOption
          active={dataType === "spend"}
          onClick={() => onDataTypeChange("spend")}
        >
          Spend Data
        </ToggleOption>
        <ToggleOption
          active={dataType === "emissions"}
          onClick={() => onDataTypeChange("emissions")}
        >
          Direct Emissions
        </ToggleOption>
      </ToggleSwitch>
    </ToggleContainer>
  );
};

export default DataTypeToggle;

