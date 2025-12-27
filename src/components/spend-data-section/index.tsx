"use client";

import SpendEntry from "../spend-entry";
import { DataSection } from "./styles";

interface SpendEntryData {
  id: number;
  supplier: string;
  amount: string;
  currency: string;
  category: string;
  description: string;
}

export interface SpendDataSectionProps {
  data: SpendEntryData;
  onUpdateEntry: (id: number, field: string, value: string) => void;
}

const SpendDataSection = ({ data, onUpdateEntry }: SpendDataSectionProps) => {
  return (
    <div className={DataSection}>
      <SpendEntry
        key={data.id}
        entry={data}
        onUpdate={(field, value) => onUpdateEntry(data.id, field, value)}
      />
    </div>
  );
};

export default SpendDataSection;

