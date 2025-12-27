/** @jsxImportSource @emotion/react */
import ActivityEntry from "../activity-entry";
import { DataSection } from "./styles";

interface ActivityEntryData {
  id: number;
  fuelType: string;
  amount: string;
  unit: string;
  equipment: string;
  notes: string;
}

export interface ActivityDataSectionProps {
  data: ActivityEntryData;
  onUpdateEntry: (id: number, field: string, value: string) => void;
}

const ActivityDataSection = ({
  data,
  onUpdateEntry,
}: ActivityDataSectionProps) => {
  return (
    <div className={DataSection}>
      <ActivityEntry
        key={data.id}
        entry={data}
        onUpdate={(field, value) => onUpdateEntry(data.id, field, value)}
      />
    </div>
  );
};

export default ActivityDataSection;

