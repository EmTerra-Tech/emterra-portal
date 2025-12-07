"use client";

import { Button } from "antd";
import { useState } from "react";
import EmissionsEntry from "../emissions-entry";
import { AddEntryBtn, AddEntrySection, DataSection } from "./styles";

export interface EmissionsEntryData {
  id: number;
  emissionsValue: number;
  unit: string;
  methodology: string;
  description: string;
}

const EmissionsDataSection = () => {
  const [entries, setEntries] = useState<EmissionsEntryData[]>([
    {
      id: 1,
      emissionsValue: 0.0,
      unit: "",
      methodology: "",
      description: "",
    },
  ]);

  const addEntry = () => {
    const newId = Math.max(...entries.map((e) => e.id)) + 1;
    setEntries([
      ...entries,
      {
        id: newId,
        emissionsValue: 0.0,
        unit: "",
        methodology: "",
        description: "",
      },
    ]);
  };

  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((entry) => entry.id !== id));
    } else {
      alert("At least one entry is required.");
    }
  };

  const updateEntry = (
    id: number,
    field: keyof EmissionsEntryData,
    value: string,
  ) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  return (
    <div className={DataSection}>
      {entries.map((entry, index) => (
        <EmissionsEntry
          key={entry.id}
          entry={entry}
          entryNumber={index + 1}
          onRemove={() => removeEntry(entry.id)}
          onUpdate={(field, value) => updateEntry(entry.id, field, value)}
        />
      ))}

      <div className={AddEntrySection}>
        <Button className={AddEntryBtn} onClick={addEntry}>
          <span>+</span> Add Another Entry
        </Button>
      </div>
    </div>
  );
};

export default EmissionsDataSection;

