"use client"

import { ToggleContainer, ToggleSwitch, ToggleOption } from "./styles"

interface DataTypeToggleProps {
  dataType: "activity" | "spend"
  onDataTypeChange: (type: "activity" | "spend") => void
}

const DataTypeToggle = ({ dataType, onDataTypeChange }: DataTypeToggleProps) => {
  return (
    <ToggleContainer>
      <ToggleSwitch>
        <ToggleOption active={dataType === "activity"} onClick={() => onDataTypeChange("activity")}>
          Activity Data
        </ToggleOption>
        <ToggleOption active={dataType === "spend"} onClick={() => onDataTypeChange("spend")}>
          Spend Data
        </ToggleOption>
      </ToggleSwitch>
    </ToggleContainer>
  )
}

export default DataTypeToggle
