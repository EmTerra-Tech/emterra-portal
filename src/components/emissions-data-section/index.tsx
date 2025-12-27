"use client";

import EmissionsEntry from "../emissions-entry";
import { DataSection } from "./styles";

export interface EmissionsEntryData {
  id: number;
  emissionsValue: number;
  unit: string;
  methodology: string;
  description: string;
}

export interface EmissionsDataSectionProps {
  data: EmissionsEntryData;
  onUpdateEntry: (id: number, field: string, value: string) => void;
}

const EmissionsDataSection = ({
  data,
  onUpdateEntry,
}: EmissionsDataSectionProps) => {
  return (
    <div className={DataSection}>
      <EmissionsEntry
        key={data.id}
        entry={data}
        onUpdate={(field, value) => onUpdateEntry(data.id, field, value)}
      />
    </div>
  );
};

export default EmissionsDataSection;

