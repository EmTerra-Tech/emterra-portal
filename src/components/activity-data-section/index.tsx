/** @jsxImportSource @emotion/react */
import { useState } from "react";
import ActivityEntry from "../activity-entry";
import { AddEntryBtn, AddEntrySection, DataSection } from "./styles";

interface ActivityEntryData {
  id: number;
  fuelType: string;
  amount: string;
  unit: string;
  equipment: string;
  notes: string;
}

const ActivityDataSection = () => {
  const [entries, setEntries] = useState<ActivityEntryData[]>([
    {
      id: 1,
      fuelType: "Natural Gas",
      amount: "1250",
      unit: "m³ (cubic meters)",
      equipment: "Boiler",
      notes: "Main heating system for the headquarters building",
    },
    {
      id: 2,
      fuelType: "Propane",
      amount: "850",
      unit: "Liters",
      equipment: "Generator",
      notes: "Backup generator for emergency power",
    },
  ]);

  const addEntry = () => {
    const newId = Math.max(...entries.map((e) => e.id)) + 1;
    setEntries([
      ...entries,
      {
        id: newId,
        fuelType: "",
        amount: "",
        unit: "",
        equipment: "",
        notes: "",
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
    field: keyof ActivityEntryData,
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
        <ActivityEntry
          key={entry.id}
          entry={entry}
          entryNumber={index + 1}
          onRemove={() => removeEntry(entry.id)}
          onUpdate={(field, value) => updateEntry(entry.id, field, value)}
        />
      ))}
      <div className={AddEntrySection}>
        <button onClick={addEntry} className={AddEntryBtn}>
          <span>+</span> Add Another Entry
        </button>
      </div>
    </div>
  );
};

export default ActivityDataSection;

