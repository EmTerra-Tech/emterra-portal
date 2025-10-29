"use client";

import { Form, Select } from "antd";
import {
  EntryContainer,
  EntryHeader,
  EntryTitle,
  FormGroup,
  FormInput,
  FormLabel,
  FormRow,
  FormSelect,
  FormTextarea,
  RemoveBtn,
  Required,
} from "./styles";

interface ActivityEntryData {
  id: number;
  fuelType: string;
  amount: string;
  unit: string;
  equipment: string;
  notes: string;
}

interface ActivityEntryProps {
  entry: ActivityEntryData;
  entryNumber: number;
  onRemove: () => void;
  onUpdate: (field: keyof ActivityEntryData, value: string) => void;
}

const ActivityEntry = ({
  entry,
  entryNumber,
  onRemove,
  onUpdate,
}: ActivityEntryProps) => {
  return (
    <Form className={EntryContainer}>
      <div className={EntryHeader}>
        <div className={EntryTitle}>Entry {entryNumber}</div>
        <div className={RemoveBtn} onClick={onRemove} title="Remove Entry">
          ✕
        </div>
      </div>

      <div className={FormRow}>
        <Form.Item className={FormGroup}>
          <label className={FormLabel}>
            Fuel Type <span className={Required}>*</span>
          </label>
          <Select
            className={FormSelect}
            value={entry.fuelType}
            onChange={(e) => onUpdate("fuelType", e)}
          >
            <option value="">Select fuel type</option>
            <option value="Natural Gas">Natural Gas</option>
            <option value="Propane">Propane</option>
            <option value="Heating Oil">Heating Oil</option>
            <option value="Diesel">Diesel</option>
            <option value="Coal">Coal</option>
            <option value="Biomass">Biomass</option>
          </Select>
        </Form.Item>
        <div className={FormGroup}>
          <label className={FormLabel}>
            Consumption Amount <span className={Required}>*</span>
          </label>
          <input
            className={FormInput}
            type="number"
            placeholder="0.00"
            step="0.01"
            value={entry.amount}
            onChange={(e) => onUpdate("amount", e.target.value)}
            required
          />
        </div>
      </div>

      <div className={FormRow}>
        <div className={FormGroup}>
          <label className={FormLabel}>
            Unit <span className={Required}>*</span>
          </label>
          <select
            className={FormSelect}
            value={entry.unit}
            onChange={(e) => onUpdate("unit", e.target.value)}
            required
          >
            <option value="">Select unit</option>
            <option value="m³ (cubic meters)">m³ (cubic meters)</option>
            <option value="kWh (kilowatt hours)">kWh (kilowatt hours)</option>
            <option value="Liters">Liters</option>
            <option value="Gallons">Gallons</option>
            <option value="kg (kilograms)">kg (kilograms)</option>
            <option value="tonnes">tonnes</option>
          </select>
        </div>
        <div className={FormGroup}>
          <label>Equipment Type</label>
          <select
            className={FormSelect}
            value={entry.equipment}
            onChange={(e) => onUpdate("equipment", e.target.value)}
          >
            <option value="">Select equipment</option>
            <option value="Boiler">Boiler</option>
            <option value="Furnace">Furnace</option>
            <option value="Generator">Generator</option>
            <option value="Heat Pump">Heat Pump</option>
            <option value="Water Heater">Water Heater</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className={FormGroup}>
        <label className={FormLabel}>Notes (Optional)</label>
        <textarea
          className={FormTextarea}
          rows={3}
          placeholder="Additional information about this fuel consumption..."
          value={entry.notes}
          onChange={(e) => onUpdate("notes", e.target.value)}
        />
      </div>
    </Form>
  );
};

export default ActivityEntry;

